import { useId, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { COUNTRIES, DEFAULT_COUNTRY_CODE } from '@/constants/countries';
import { ENQUIRY_SOURCES } from '@/constants/enquiry';
import { useContent } from '@/i18n/content';
import { stripLanguage } from '@/i18n/language';
import { useLanguage } from '@/i18n/useLanguage';
import { Button } from '@/components/ui/Button';
import { buildEnquiryLead, submitEnquiry } from '@/services/enquiry';
import { suppressEnquiryPopup } from '@/services/enquiryStorage';
import { SearchableSelect } from './SearchableSelect';
import { fieldClasses, FIELD_ERROR_CLASSES, FIELD_LABEL_CLASSES } from './fieldClasses';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

/** Everything that is not a digit — punctuation, spaces, a leading plus. */
const digitsOf = (value) => value.replace(/\D/g, '');

/**
 * Indian mobile numbers, accepted in the forms people actually type:
 * `9740740340`, `+91 97407 40340`, `09740740340`, `0091-9740740340`.
 * The rule itself is the real one — ten digits opening 6, 7, 8 or 9.
 */
function isValidIndianMobile(value) {
  let digits = digitsOf(value);
  if (digits.length === 13 && digits.startsWith('0091')) digits = digits.slice(4);
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits);
}

/**
 * Everyone else. ITU E.164 allows up to 15 digits and no national numbering
 * plan is shorter than 7, so this is deliberately a sanity check rather than
 * per-country validation: the form offers 245 regions, and rejecting a
 * legitimate number the site cannot model would cost a lead outright.
 */
function isPlausibleInternationalMobile(value) {
  const digits = digitsOf(value);
  return digits.length >= 7 && digits.length <= 15;
}

/**
 * A labelled text input. Declared at module scope, not inside the form, so
 * React keeps the same element across renders — a component defined in a
 * render body is a new type every time and remounts the input, which drops
 * focus on the first keystroke.
 */
function TextField({
  id,
  label,
  type = 'text',
  placeholder,
  inputMode,
  autoComplete,
  error,
  registration,
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className={FIELD_LABEL_CLASSES}>
        {label}
        <span aria-hidden="true" className="ml-0.5 text-primary">
          *
        </span>
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        aria-required="true"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClasses(Boolean(error))}
        {...registration}
      />

      {error && (
        <span id={errorId} className={FIELD_ERROR_CLASSES}>
          {error}
        </span>
      )}
    </div>
  );
}

/**
 * The six-field enquiry form — the site's single lead-capture implementation.
 *
 * **Rendered in two places, and it owns no presentation of its own beyond the
 * fields.** `EnquiryModal` mounts it inside the timed popup; the `/contact`
 * page mounts it permanently inside `ContactEnquiryCard`. Fields, labels,
 * validation, payload and submission therefore cannot drift between the two,
 * because there is only one of each. Anything a container needs to differ on
 * arrives as a prop (`source`) or is handled by the container itself (the
 * heading above the form, and what happens after `onSuccess`).
 *
 * **The programme list is not declared here.** It is read from the same
 * `useContent()` course data that the homepage grid, the programmes listing
 * and the six detail pages render, grouped by the site's own UG/PG headings —
 * so a counsellor receives the exact programme name a visitor saw, and adding
 * a course to `constants/courses.js` puts it in this dropdown with no change
 * to this file. There is no MCA on the site, so there is no MCA option; the
 * brief's examples are examples, not a list to conjure.
 *
 * Validation runs on submit and then re-runs per field as it is corrected
 * (`mode: 'onTouched'` plus RHF's default `reValidateMode`), which keeps a
 * pristine form quiet while still confirming a fix immediately.
 */
export function EnquiryForm({ onSuccess, source = ENQUIRY_SOURCES.popup }) {
  const { ui, ugCourses, pgCourses } = useContent();
  const copy = ui.enquiry;
  const language = useLanguage();
  const page = stripLanguage(useLocation().pathname);

  /**
   * Field ids are generated, not literals, because both containers can be on
   * screen at once: a visitor reading `/contact` still gets the popup on its
   * schedule, and two forms sharing `id="enquiry-name"` would point both
   * labels at the first input and break `aria-describedby` and the
   * comboboxes' `aria-activedescendant`. `useId` guarantees uniqueness per
   * instance without either call site having to remember to pass a prefix.
   */
  const uid = useId();
  const fieldId = (name) => `enquiry-${name}-${uid}`;

  const [submitError, setSubmitError] = useState(null);

  /**
   * Programme implied by the current route: on `/programmes/mba` the visitor
   * is already telling us what they want, so the field opens pre-filled and
   * the form is one decision shorter. Matched on `detailPath` rather than by
   * parsing the slug, because `detailPath` is the value the rest of the site
   * navigates by — and matched against the language-stripped path so `/kn`
   * routes preselect too.
   */
  const allCourses = useMemo(() => [...ugCourses, ...pgCourses], [ugCourses, pgCourses]);
  const routeCourse = useMemo(
    () => allCourses.find((course) => course.detailPath === page) ?? null,
    [allCourses, page],
  );

  const programmeGroups = useMemo(() => {
    const toOption = (course) => ({
      value: course.id,
      label: course.name,
      // The formal degree title is what the site displays and therefore what
      // the option reads, but nobody searches for "Master of Business
      // Administration" — they type "MBA", or "maths", or "commerce". The
      // abbreviations live on the course itself (`searchTerms`) so this stays
      // a rendering concern; the description covers the searched phrasing and
      // the specializations let "Sanskrit" find the MA.
      keywords: [
        course.id,
        course.description,
        ...(course.searchTerms ?? []),
        ...(course.specializations ?? []),
      ],
    });

    return [
      { label: ui.courses.ugHeading, options: ugCourses.map(toOption) },
      { label: ui.courses.pgHeading, options: pgCourses.map(toOption) },
    ];
  }, [pgCourses, ugCourses, ui.courses.pgHeading, ui.courses.ugHeading]);

  const countryOptions = useMemo(
    () =>
      COUNTRIES.map((country) => ({
        value: country.code,
        label: country.name,
        keywords: country.aliases ?? [],
      })),
    [],
  );

  const {
    control,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    register,
    trigger,
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      studentName: '',
      mobile: '',
      email: '',
      city: '',
      country: DEFAULT_COUNTRY_CODE,
      programme: routeCourse?.id ?? '',
    },
  });

  const onSubmit = async (values) => {
    // RHF disables nothing on its own; the button is disabled while
    // submitting and this guard covers the keyboard path to the same click.
    if (isSubmitting) return;
    setSubmitError(null);

    try {
      await submitEnquiry(
        buildEnquiryLead({
          values,
          countryName:
            COUNTRIES.find((country) => country.code === values.country)?.name ?? values.country,
          programmeName:
            allCourses.find((course) => course.id === values.programme)?.name ?? values.programme,
          page,
          pageTitle: document.title,
          language,
          source,
        }),
      );
      // A captured lead silences the popup for a week, wherever it was
      // captured. It lives here rather than in the popup's controller so that
      // this form's second home on `/contact` — and any future third one —
      // gets the behaviour without anyone remembering to wire it up.
      suppressEnquiryPopup();
      onSuccess();
    } catch (error) {
      // Surfaced to the visitor as a retryable message rather than a silent
      // failure — a confirmation they did not earn is worse than an error.
      console.error('[enquiry] submission failed', error);
      setSubmitError(copy.errors.submitFailed);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      /*
       * `@container` + `@md:` rather than `sm:`/`lg:`, because this form has
       * two homes of very different widths and the viewport says nothing
       * useful about either. It is ~390px wide inside the popup panel at any
       * screen size, and ~560px inside the contact page's card — so the
       * paired rows below open up on the contact page and stay stacked in the
       * popup, on one set of classes and with no prop deciding which layout
       * to use. A viewport breakpoint would have widened the popup's fields
       * too, on exactly the large screens where the panel is still narrow.
       */
      className="@container mt-4 flex flex-col gap-3 sm:mt-5 sm:gap-3.5 @md:gap-4"
    >
      <TextField
        id={fieldId('name')}
        label={copy.fields.nameLabel}
        placeholder={copy.fields.namePlaceholder}
        autoComplete="name"
        error={errors.studentName?.message}
        registration={register('studentName', {
          required: copy.errors.nameRequired,
          validate: (value) =>
            (value.trim().length >= 2 && /\p{L}/u.test(value)) || copy.errors.nameInvalid,
        })}
      />

      {/* Two ways to reach the applicant, side by side where there is room. */}
      <div className="grid gap-3 @md:grid-cols-2 @md:gap-4">
        <TextField
          id={fieldId('mobile')}
          label={copy.fields.mobileLabel}
          placeholder={copy.fields.mobilePlaceholder}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          error={errors.mobile?.message}
          registration={register('mobile', {
            required: copy.errors.mobileRequired,
            // The second argument is the whole form, which is how the rule can
            // depend on the country field without watching it and re-rendering.
            validate: (value, formValues) =>
              formValues.country === 'IN'
                ? isValidIndianMobile(value) || copy.errors.mobileInvalidIndia
                : isPlausibleInternationalMobile(value) || copy.errors.mobileInvalid,
          })}
        />

        <TextField
          id={fieldId('email')}
          label={copy.fields.emailLabel}
          placeholder={copy.fields.emailPlaceholder}
          type="email"
          inputMode="email"
          autoComplete="email"
          error={errors.email?.message}
          registration={register('email', {
            required: copy.errors.emailRequired,
            pattern: { value: EMAIL_PATTERN, message: copy.errors.emailInvalid },
          })}
        />
      </div>

      {/* Where the applicant is, likewise: the country select drives which
          mobile rule applies, so keeping the two adjacent makes that link
          visible rather than surprising. */}
      <div className="grid gap-3 @md:grid-cols-2 @md:gap-4">
        <TextField
          id={fieldId('city')}
          label={copy.fields.cityLabel}
          placeholder={copy.fields.cityPlaceholder}
          autoComplete="address-level2"
          error={errors.city?.message}
          registration={register('city', {
            required: copy.errors.cityRequired,
            validate: (value) => value.trim().length >= 2 || copy.errors.cityRequired,
          })}
        />

        <Controller
          control={control}
          name="country"
          rules={{ required: copy.errors.countryRequired }}
          render={({ field }) => (
            <SearchableSelect
              id={fieldId('country')}
              label={copy.fields.countryLabel}
              placeholder={copy.fields.countryPlaceholder}
              options={countryOptions}
              value={field.value}
              onBlur={field.onBlur}
              onChange={(value) => {
                field.onChange(value);
                // Switching to or from India changes which mobile rule
                // applies, so a number already entered has to be judged
                // again — without this, a valid UAE number stays flagged by
                // the Indian rule.
                if (getValues('mobile')) trigger('mobile');
              }}
              required
              error={errors.country?.message}
              errorId={`${fieldId('country')}-error`}
              noResultsLabel={copy.noResults}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="programme"
        rules={{ required: copy.errors.programmeRequired }}
        render={({ field }) => (
          <SearchableSelect
            id={fieldId('programme')}
            label={copy.fields.programmeLabel}
            placeholder={copy.fields.programmePlaceholder}
            groups={programmeGroups}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            required
            error={errors.programme?.message}
            errorId={`${fieldId('programme')}-error`}
            noResultsLabel={copy.noResults}
          />
        )}
      />

      {submitError && (
        <p
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-[13px] font-medium text-red-600"
        >
          {submitError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="mt-1 w-full disabled:opacity-70">
        {isSubmitting && (
          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {isSubmitting ? copy.submitting : copy.submit}
      </Button>

      <p className="text-center text-[11.5px] text-muted-foreground">{copy.requiredNote}</p>
    </form>
  );
}
