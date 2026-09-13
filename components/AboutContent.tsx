"use client";
import { useI18n } from "@/lib/i18n";
import TeamCard from "@/components/TeamCard";

export function AboutBanner() {
  const { t } = useI18n();
  return (
    <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
      <h1 className="text-4xl font-bold drop-shadow-2xl">{t("about.bannerTitle")}</h1>
      <p className="mt-4 text-lg drop-shadow-lg">{t("about.bannerDesc")}</p>
    </div>
  );
}

export function AboutStory() {
  const { t } = useI18n();
  return (
    <section className="px-6 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">{t("about.storyTitle")}</h2>
      <p className="text-gray-700 mb-6">{t("about.storyDesc1")}</p>
      <p className="text-gray-700 mb-6">{t("about.storyDesc2")}</p>
      <p className="text-gray-700">At CAR STYLE, we believe every vehicle deserves to shine. We combine advanced technology with hand-finished precision to deliver results that speak for themselves.</p>
    </section>
  );
}

export function AboutTeam() {
  const { t } = useI18n();
  return (
    <section className="px-6 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">{t("about.teamTitle")}</h2>
      <div className="flex justify-center">
        <TeamCard name="Prasanna Jadhav" role="Owner & Founder" image="/prasanna.jpeg" description="" />
      </div>
    </section>
  );
}
