import { Link } from 'react-router-dom';
import crest from '@/assets/ksou-crest.jpeg';

export function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="KSOU Online — go to homepage"
      className={`flex items-center gap-3.5 ${className}`}
    >
      <img
        src={crest}
        alt="Karnataka State Open University crest"
        className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
      />
      <span className="flex flex-col leading-tight">
        {/* nowrap on both lines: in a tight navbar row the wordmark would
            otherwise collapse into a four-line stack rather than letting the
            nav shrink, which threw the whole header out of alignment. */}
        <span className="whitespace-nowrap font-brand text-[20px] text-foreground sm:text-[21px]">
          KSOU <span className="text-primary">Online</span>
        </span>
        <span className="hidden whitespace-nowrap text-[11px] font-medium tracking-wide text-muted-foreground sm:block">
          Karnataka State Open University
        </span>
      </span>
    </Link>
  );
}
