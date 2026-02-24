import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { ArrowRight, X } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/typography';
import type { TeamMember } from '../types/teamMember';
import { SocialLinks } from './SocialLinks';

interface TeamMemberCardProps {
  member: TeamMember;
  isActive: boolean;
  isLastOddItem: boolean;
  onToggle: () => void;
}

export const TeamMemberCard = ({
  member,
  isActive,
  isLastOddItem,
  onToggle,
}: TeamMemberCardProps) => {
  const { t } = useTranslation();

  const handleToggleWithStopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
    onToggle();
  };

  const description = t(member.descriptionKey, {
    defaultValue: t('team.defaultDescription', {
      defaultValue:
        'A passionate team member dedicated to delivering high-quality solutions.',
    }),
  });

  return (
    <div
      className={cn(
        'relative h-[340px] cursor-pointer overflow-hidden rounded-2xl shadow-lg',
        'border border-white/10 transition-all duration-500',
        'hover:shadow-xl hover:-translate-y-1',
        isActive && 'ring-2 ring-white/20',
        isLastOddItem &&
          'sm:col-span-2 sm:max-w-[calc(50%-12px)] sm:mx-auto sm:w-full',
      )}
      onClick={onToggle}
    >
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br transition-transform duration-500',
          member.gradient,
          isActive ? 'scale-110 blur-sm opacity-60' : 'scale-100 opacity-100',
        )}
      />

      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center transition-all duration-500',
          isActive ? 'opacity-0 scale-90' : 'opacity-100 scale-100',
        )}
      >
        <span className="text-white/25 font-bold text-8xl select-none">
          {member.initials}
        </span>
      </div>

      <button
        onClick={handleToggleWithStopPropagation}
        aria-label={`View ${member.name}'s profile`}
        className={cn(
          'absolute top-4 right-4 z-30 p-2',
          'text-white bg-white/20 hover:bg-white/40',
          'backdrop-blur-md rounded-full',
          'transition-all duration-300 border border-white/30',
          isActive ? 'opacity-0 pointer-events-none' : 'opacity-100',
        )}
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 p-5 z-10',
          'bg-gradient-to-t from-black/75 to-transparent',
          'transition-opacity duration-300',
          isActive ? 'opacity-0 pointer-events-none' : 'opacity-100',
        )}
      >
        <h3 className={`${TYPOGRAPHY.h2} text-white`}>{member.name}</h3>
        <p className={`${TYPOGRAPHY.body} text-white/70`}>{member.position}</p>
      </div>

      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-between p-5 z-20',
          'bg-card text-card-foreground',
          'transition-all duration-500 ease-in-out',
          isActive ?
            'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0 pointer-events-none',
        )}
      >
        <div className="flex justify-between items-start">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              'text-white font-bold text-sm shrink-0',
              `bg-gradient-to-br ${member.gradient}`,
            )}
          >
            {member.initials}
          </div>
          <button
            onClick={handleToggleWithStopPropagation}
            aria-label="Close"
            className="p-1.5 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-full transition-colors z-30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 mt-3">
          <h3 className={`${TYPOGRAPHY.h2} text-card-foreground leading-tight`}>
            {member.name}
          </h3>
          <p className={`${TYPOGRAPHY.body} text-muted-foreground mb-3`}>
            {member.position}
          </p>
          <p
            className={`${TYPOGRAPHY.body} text-card-foreground/80 leading-relaxed`}
          >
            {description}
          </p>
        </div>

        <SocialLinks member={member} />
      </div>
    </div>
  );
};
