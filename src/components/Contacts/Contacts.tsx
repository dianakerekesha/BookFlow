import { useTranslation } from 'react-i18next';
import { TYPOGRAPHY } from '@/constants/typography';
import { TEAM_MEMBERS } from './constants/teamMembers';
import { useActiveCard } from './hooks/useActiveCard';
import { TeamMemberCard } from './components/TeamMemberCard';

export const Contacts = () => {
  const { t } = useTranslation();
  const { activeIndex, handleToggleCard } = useActiveCard();

  const isOddTotal = TEAM_MEMBERS.length % 2 !== 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className={`${TYPOGRAPHY.h1} text-foreground mb-8 text-center`}>
        {t('team.ourTeam')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {TEAM_MEMBERS.map((member, index) => (
          <TeamMemberCard
            key={member.name}
            member={member}
            isActive={index === activeIndex}
            isLastOddItem={isOddTotal && index === TEAM_MEMBERS.length - 1}
            onToggle={() => handleToggleCard(index)}
          />
        ))}
      </div>
    </div>
  );
};
