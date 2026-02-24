import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { ArrowRight, X } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/typography';

export const ContactsPage = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const members = [
    {
      name: 'Lorum Ipsumov',
      position: 'Senior Developer',
      bgColor: 'bg-card',
      description: 'asdfghjkl qwertyuiop zxcvbnm poiuytrewq asdfghjkl',
    },
    {
      name: 'Jone Doe',
      position: 'Product Manager',
      bgColor: 'bg-card',
      description: 'mnbvcxz lkjhgfdsa poiuytrewq qazwsxedcr fvgtbhy njuim',
    },
    {
      name: 'Alan Smithee',
      position: 'UX Designer',
      bgColor: 'bg-card',
      description: 'plmokn ijbhyg vcdfrx swzaq xdrfvt gbyhnu jmkiolp',
    },
    {
      name: 'Random Person',
      position: 'QA Engineer',
      bgColor: 'bg-card',
      description: 'qwe rty uio pas dfg hjk lzx cvb nm qaz wsx edc rfv tgb',
    },
    {
      name: 'Random Per',
      position: 'Engineer',
      bgColor: 'bg-card',
      description:
        'qwe rtyвцу3ц uio pas dfg hjk lzx cvb nm qaz wsx edc rfv tgb',
    },
  ];

  const toggleCard = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mx-auto px-4 mt-25">
      <h2 className={`${TYPOGRAPHY.h1} text-white mb-8 text-center`}>
        {t('team.ourTeam')}
      </h2>

      <div
        className="grid 
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-5 
        gap-6"
      >
        {members.map((member, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              className={cn(
                'relative h-[400px] cursor-pointer overflow-hidden rounded-lg shadow-md border border-gray-200 bg-background transition-all duration-500 group',
                isActive && 'bg-card',
              )}
              onClick={() => toggleCard(index)}
            >
              <div
                className={cn(
                  'absolute inset-0 transition-transform duration-500',
                  isActive ? 'scale-105 blur-sm' : 'scale-100',
                  member.bgColor,
                )}
              ></div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCard(index);
                }}
                className={cn(
                  'absolute top-4 right-4 z-30 p-2 text-custom-primary dark:text-white bg-card hover:bg-white/40 backdrop-blur-md rounded-full transition-all duration-300 border border-white/30',
                  isActive ? 'opacity-0 pointer-events-none' : 'opacity-100',
                )}
              >
                <ArrowRight className="w-5 h-5" />
              </button>

              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/90 dark:from-black/90 to-transparent transition-opacity duration-300 z-10',
                  isActive ? 'opacity-0' : 'opacity-100',
                )}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3
                      className={`${TYPOGRAPHY.h2} text-black dark:text-white`}
                    >
                      {member.name}
                    </h3>
                    <p className={`${TYPOGRAPHY.body} text-foreground`}>
                      {member.position}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  'absolute inset-0 flex flex-col justify-between p-4 bg-card text-card-foreground transition-all duration-500 ease-in-out z-20',
                  TYPOGRAPHY.body,
                  isActive ?
                    'translate-x-0 opacity-100'
                  : 'translate-x-full opacity-0 pointer-events-none',
                )}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCard(index);
                  }}
                  className="absolute top-4 right-4 text-custom-primary dark:text-white p-1 bg-card hover:bg-white/40 rounded-full border-white/30 z-30"
                >
                  <X className="w-6 h-6" />
                </button>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className={`${TYPOGRAPHY.h2} text-card-foreground`}>
                        {member.name}
                      </h3>
                      <p className={`${TYPOGRAPHY.body} text-muted-foreground`}>
                        {member.position}
                      </p>
                    </div>
                  </div>

                  <p
                    className={`${TYPOGRAPHY.body} text-card-foreground text-left`}
                  >
                    {t(`team.${member.description}`)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
