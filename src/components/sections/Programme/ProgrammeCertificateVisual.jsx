import { Award } from 'lucide-react';

/**
 * No certificate image exists yet for any programme. Reserves a large,
 * editorial-scale frame — shadow + depth so it reads as a real credential
 * rather than a small generic card — so a real certificate scan can drop in
 * later per programme:
 *
 *   <img
 *     src={programmeCertificate}
 *     alt="KSOU [Programme] degree certificate"
 *     className="h-full w-full rounded-[16px] object-contain"
 *   />
 */
export function ProgrammeCertificateVisual({ label }) {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div
        aria-hidden="true"
        className="absolute -bottom-4 -right-4 hidden aspect-[7/5] w-full rounded-[20px] border border-gold/30 bg-gold/5 sm:block"
      />
      <div
        role="img"
        aria-label={label}
        className="relative flex aspect-[7/5] w-full flex-col items-center justify-center gap-3 rounded-[20px] border border-border bg-white p-8 text-center shadow-[0_1px_2px_rgba(17,17,17,0.04),0_32px_64px_-24px_rgba(17,17,17,0.28)]"
      >
        <Award className="h-12 w-12 text-primary/30" aria-hidden="true" />
        <p className="text-sm font-medium text-muted-foreground">Degree certificate to be added</p>
      </div>
    </div>
  );
}
