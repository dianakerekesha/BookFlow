import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TYPOGRAPHY } from '@/constants/typography';

const BASE_FINE = 847.5;
const FINE_PER_SECOND = 0.00003;
const REPORT_LIMIT = 5;

const EXCUSES = [
  'The dog ate it. The page, not the book.',
  'Was going to return it but got really into chapter 3.',
  'Left it at a café in Paris. Very romantic.',
  'Still reading. It is a long page.',
  '"Page" is a broad concept. Philosophically.',
  'The page asked to stay. Who am I to say no.',
];

const STAMPS = ['OVERDUE', 'FINAL NOTICE', 'WE KNOW WHERE YOU LIVE'];

function getRandomItem<Type>(array: Type[]): Type {
  return array[Math.floor(Math.random() * array.length)];
}

interface NoticeRowProps {
  label: string;
  value: React.ReactNode;
}

function NoticeRow({ label, value }: NoticeRowProps) {
  return (
    <div className="flex border-b border-border last:border-b-0">
      <span
        className={`w-36 shrink-0 bg-muted px-4 py-2.5 text-muted-foreground border-r border-border ${TYPOGRAPHY.uppercase}`}
      >
        {label}
      </span>
      <span className={`px-4 py-2.5 text-foreground ${TYPOGRAPHY.body}`}>
        {value}
      </span>
    </div>
  );
}

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const [fine, setFine] = useState(BASE_FINE);
  const [isReported, setIsReported] = useState(false);
  const [reportCount, setReportCount] = useState(0);

  const [excuse] = useState(() => getRandomItem(EXCUSES));
  const [stamp] = useState(() => getRandomItem(STAMPS));

  const reportTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setFine((previous) => previous + FINE_PER_SECOND);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (reportTimeoutRef.current) clearTimeout(reportTimeoutRef.current);
    };
  }, []);

  function handleReport() {
    setIsReported(true);
    setReportCount((previous) => previous + 1);

    if (reportTimeoutRef.current) clearTimeout(reportTimeoutRef.current);
    reportTimeoutRef.current = setTimeout(() => setIsReported(false), 2000);
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-6">
      <div className="bg-background max-w-lg w-full shadow-lg rounded-sm border border-border overflow-hidden">
        <div className="bg-destructive px-8 py-4 flex items-center justify-between">
          <span className={`text-white ${TYPOGRAPHY.uppercase}`}>
            Codex — Library Services
          </span>
          <span className={`text-red-200 ${TYPOGRAPHY.small}`}>
            REF: NB-404-2019
          </span>
        </div>

        <div className="px-8 py-7 relative">
          <div
            className={`absolute top-6 right-6 border-4 border-destructive text-destructive px-3 py-1 rotate-12 opacity-80 select-none ${TYPOGRAPHY.uppercase}`}
          >
            {stamp}
          </div>

          <p className={`text-ring mb-1 ${TYPOGRAPHY.uppercase}`}>
            Official Notice
          </p>

          <h1
            className={`text-foreground font-black leading-tight mb-6 ${TYPOGRAPHY.h3}`}
          >
            This page has been
            <br />
            <span className="text-destructive">borrowed and not returned.</span>
          </h1>

          <div className="border border-border rounded-sm mb-6 overflow-hidden">
            <NoticeRow
              label="Borrower"
              value={
                <span className="font-mono font-bold">
                  definitely_not_a_bookworm_42
                </span>
              }
            />
            <NoticeRow
              label="Checked out"
              value="January 3, 2019"
            />
            <NoticeRow
              label="Due date"
              value="January 17, 2019"
            />
            <NoticeRow
              label="Their excuse"
              value={
                <span className="text-muted-foreground italic">{excuse}</span>
              }
            />
            <NoticeRow
              label="Fine accrued"
              value={
                <span className="font-black text-destructive font-mono tabular-nums">
                  ${fine.toFixed(2)}
                  <span
                    className={`text-red-300 ml-1 font-normal ${TYPOGRAPHY.small}`}
                  >
                    (live)
                  </span>
                </span>
              }
            />
          </div>

          <p
            className={`text-ring leading-relaxed mb-7 border-l-2 border-border pl-3 ${TYPOGRAPHY.body}`}
          >
            We have sent{' '}
            <strong className="text-muted-foreground">
              14 reminder emails
            </strong>
            , dispatched{' '}
            <strong className="text-muted-foreground">2 carrier pigeons</strong>
            , and contacted{' '}
            <strong className="text-muted-foreground">their mother</strong>. No
            response.
          </p>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate('/')}
              className={`flex-1 bg-foreground text-white py-3 px-5 rounded-sm hover:opacity-80 transition-opacity duration-150 cursor-pointer border-0 ${TYPOGRAPHY.buttons}`}
            >
              ← Return to Catalog
            </button>
            <button
              onClick={handleReport}
              className={`flex-1 py-3 px-5 rounded-sm transition-all duration-150 cursor-pointer border-0 ${TYPOGRAPHY.buttons} ${
                isReported ?
                  'bg-primary text-white'
                : 'bg-red-50 text-destructive hover:bg-red-100'
              }`}
            >
              {isReported ?
                `Reported! (×${reportCount})`
              : '🚨 Report the Borrower'}
            </button>
          </div>

          {reportCount >= REPORT_LIMIT && (
            <p
              className={`text-center text-ring mt-3 italic ${TYPOGRAPHY.small}`}
            >
              Okay we get it. We&#39;ve notified the authorities. And their
              mother again.
            </p>
          )}
        </div>

        <div className="bg-muted border-t border-border px-8 py-3 flex justify-between items-center">
          <span className={`text-ring ${TYPOGRAPHY.small}`}>
            Page status:{' '}
            <span className="text-destructive font-bold">404 — Missing</span>
          </span>
          <span className={`text-ring opacity-50 ${TYPOGRAPHY.small}`}>
            Est. return: never
          </span>
        </div>
      </div>
    </div>
  );
};
