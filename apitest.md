I want you to connect the existing lead generation / enquiry form on the KSOU Online website directly to the following API:

POST https://onlineprogramme.ksoumysuru.ac.in/ksouapi/api/enquiries

The purpose is to send every successfully submitted enquiry form directly to the KSOU enquiry system/Talisma through this API.

1. Do not redesign the form

The existing enquiry popup/form UI, styling, animations, validation, popup frequency and overall UX are already implemented.

Do not unnecessarily change the UI.

Your job is primarily to connect the existing form submission to the API and make sure the data is correctly transformed into the API's required format.

2. Existing form fields

The lead generation form collects the following information:

Student Name
Mobile Number
Email ID
City
Country
Select Course / Programme

The form should continue working exactly as it currently does from the user's perspective.

When the user clicks Submit, the data should be sent to the API.

3. API request format

The API expects a JSON request similar to this:

const res = await fetch(
  'https://onlineprogramme.ksoumysuru.ac.in/ksouapi/api/enquiries',
  {
    method: 'POST',
    headers: {
      'accept': 'text/plain',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      studentName: "Test User",
      mobileNo: "9999999999",
      emailId: "test@test.com",
      city: "Bangalore",
      countryId: 77,
      country: "india",
      programId: 2,
      program: "MA",
      utmSource: "test",
      utmMedium: "test",
      utmCampaign: "test"
    }),
  }
);


console.log(await res.text());

Use this structure as the basis for the actual integration.

4. Map the existing form fields to the API

The mapping should be:

Form Field	API Field
Student Name	studentName
Mobile Number	mobileNo
Email ID	emailId
City	city
Country ID	countryId
Country name	country
Selected Course ID	programId
Selected Course name	program
UTM source	utmSource
UTM medium	utmMedium
UTM campaign	utmCampaign

Make sure the actual values selected by the visitor are sent, not placeholder/test values.

5. VERY IMPORTANT: Course/program mapping

The website already contains the complete list of KSOU Online programmes.

Inspect the existing programme/course data in the project before implementing this.

Do NOT create a new unrelated course list.

For every course, there should be a mapping between:

Course displayed to user
        ↓
programId
        ↓
program

For example:

{
  programId: 2,
  program: "MA"
}

But do not assume that 2 is the correct ID for MA unless the existing project/API data confirms it.

Critical requirement

When the user selects a course:

MBA
B.Com
M.Com
B.A.
M.A.
etc.

the API must receive the corresponding official programId and program value expected by the KSOU API.

If the existing project contains the IDs, reuse them.

If the project does not contain the IDs, investigate whether they are available from the existing KSOU programme data/API.

Never randomly assign IDs.

6. Country mapping

The enquiry form currently has a country selector with searchable countries.

Keep the existing country selector.

For the selected country, send both:

countryId
country

For example:

countryId: 77,
country: "india"

But again:

Do not assume that 77 is India's ID unless the existing country mapping confirms it.

Use the existing country data/mapping if available.

The API needs both the numerical ID and country name.

7. UTM tracking

I also want proper marketing attribution.

Capture UTM parameters from the URL whenever they are available.

For example:

?utm_source=google
&utm_medium=cpc
&utm_campaign=ksou-july-2026

These should be sent as:

utmSource
utmMedium
utmCampaign

Example:

utmSource: "google",
utmMedium: "cpc",
utmCampaign: "ksou-july-2026"

If a UTM parameter does not exist, send a sensible empty value such as:

utmSource: "",
utmMedium: "",
utmCampaign: ""

Do not send "test" in production.

Also make sure the UTM values are preserved if the visitor lands on the website with UTM parameters and submits the form later after navigating around the website.

If practical, persist them in sessionStorage or another appropriate client-side mechanism so that navigation does not lose attribution.

8. Submit handler

Integrate the API call into the actual existing form submit handler.

Do not create a second duplicate form.

The flow should be:

User fills form
        ↓
Client-side validation
        ↓
Prepare API payload
        ↓
POST request to KSOU API
        ↓
Check API response
        ↓
Success / failure handling

The API call should only happen after the form passes the existing validation.

9. Prevent duplicate submissions

This is extremely important because this form is being used for lead generation.

When the user clicks Submit:

Disable the submit button.
Show a loading state.
Prevent multiple simultaneous API requests.
Send only one enquiry.
Re-enable the button if the request fails.
Do not accidentally submit the same lead multiple times because of rapid clicks.

For example:

Submit
↓
Submitting...
↓
API request
↓
Success

The user should not be able to generate five API requests by clicking the button five times.

10. Success behaviour

If the API returns a successful response:

Treat the enquiry as successfully submitted.
Show a clean success message in the existing UI.
Close the popup if that is how the existing form currently behaves.
Reset the form if appropriate.
Do not show a generic error message.
Make sure the lead is not submitted again immediately.

The success message can be something like:

"Thank you! Your enquiry has been submitted successfully. Our counsellor will contact you shortly."

Keep the wording consistent with the existing website's design and tone.

11. API failure behaviour

If the API request fails:

Do NOT silently pretend that the lead was submitted.

Handle:

Network failure

Example:

Unable to connect to the enquiry service.
Please try again.
API error

Display an appropriate user-friendly message.

Do not expose technical API errors, stack traces, internal URLs or debugging information to the visitor.

The console can contain useful debugging information during development, but the production UI should remain clean.

12. CORS handling

First, implement the API request directly from the frontend as shown above.

Test whether:

https://onlineprogramme.ksoumysuru.ac.in/ksouapi/api/enquiries

allows requests from the deployed Vercel domain.

If direct browser requests work:

Keep the direct API implementation.

If the browser produces a CORS error:

Do NOT start making random frontend changes.

Instead, identify the CORS problem and implement the appropriate secure proxy/server-side route available within the existing application architecture.

For example, if this is a Vite/React application deployed on Vercel, consider an appropriate server-side/API proxy approach rather than exposing unnecessary credentials or workarounds in the browser.

The final implementation must work from the actual deployed website, not merely from localhost.

13. Do not expose secrets

Inspect the API and existing project architecture carefully.

Do not hardcode:

API keys
private credentials
authentication tokens
secret keys

into frontend JavaScript if the API requires any confidential credentials.

If authentication is required, use an appropriate server-side environment variable/proxy mechanism.

14. Validate the actual payload

Before considering the integration complete, temporarily log the final payload during development.

For example:

console.log("KSOU enquiry payload:", payload);

Verify that it looks like:

{
  studentName: "...",
  mobileNo: "...",
  emailId: "...",
  city: "...",
  countryId: ...,
  country: "...",
  programId: ...,
  program: "...",
  utmSource: "...",
  utmMedium: "...",
  utmCampaign: "..."
}

Make sure:

studentName contains the actual name
mobileNo contains the actual phone number
emailId contains the actual email
city contains the actual city
countryId is the correct country ID
country is the selected country
programId is the correct programme ID
program is the correct programme name
UTM fields contain the actual attribution values

Remove unnecessary debug logging before production if it could expose personal information.

15. Test with a controlled test lead

Use a test submission first.

For example:

Name: Test User
Mobile: 9999999999
Email: test@test.com
City: Bangalore
Country: India
Course: MA

Do not use fake/random course IDs.

Confirm that:

The API request reaches the endpoint.
The API returns a successful response.
The correct programme is passed.
The correct country ID is passed.
The lead appears correctly in the receiving system/Talisma if the environment provides access.
UTM information is correctly transmitted.
16. Important: use the existing project data

Before changing anything, inspect:

Existing course/programme data
Existing country list
Existing form component
Existing form validation
Existing popup component
Existing submit handler
Existing UTM handling
Existing routing
Existing API/service utilities

Do not duplicate existing data or create competing implementations.

Reuse the project's current architecture wherever possible.

17. Preserve the existing UI/UX

Do not redesign the enquiry form.

Keep:

Existing colours
Existing typography
Existing spacing
Existing popup animation
Existing validation UI
Existing responsive behaviour
Existing mobile layout
Existing popup timing
Existing close button
Existing course selector
Existing searchable country selector

Only modify the underlying submission logic and any minimal UI needed to show:

Submitting...
Success
Error
18. Final acceptance criteria

Consider this task complete only when all of the following are true:

Form

☑ Existing form still looks the same
☑ Existing popup behaviour remains intact
☑ All fields validate correctly
☑ Country selection works
☑ Course selection works

API

☑ Form submits to the KSOU enquiry API
☑ Correct HTTP method is used
☑ Correct headers are used
☑ Correct JSON structure is used
☑ Correct course/programme ID is sent
☑ Correct country ID is sent
☑ Actual visitor data is sent
☑ UTM attribution is sent

UX

☑ Submit button shows loading state
☑ Multiple submissions are prevented
☑ Success message is shown after successful submission
☑ Failure is clearly communicated
☑ No technical errors are exposed to users

Deployment

☑ Test on localhost
☑ Test on the actual Vercel deployment
☑ Verify CORS behaviour
☑ If CORS fails, implement an appropriate server-side proxy
☑ Do not expose confidential credentials

Most important

Do not guess programId or countryId. Inspect the existing project/API data and use the correct mappings. If you cannot establish a correct mapping, stop and tell me exactly which mapping is missing instead of inventing values.

One more thing I want you to do

After implementing this, give me a short technical summary containing:

1. Files modified
2. API endpoint used
3. Form → API field mapping
4. Course/program ID mapping source
5. Country ID mapping source
6. UTM tracking implementation
7. Whether direct API submission worked
8. Whether CORS was encountered
9. If a proxy was required, explain where it was implemented
10. How the integration was tested

Do not make unrelated changes to the website. Focus specifically on connecting the existing lead generation form to the KSOU enquiry API correctly and reliably.