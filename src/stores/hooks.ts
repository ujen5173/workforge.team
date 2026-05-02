import { useShallow } from "zustand/react/shallow";

import { useAppStore } from "./StoreProvider";

export const useDate = () =>
  useAppStore(
    useShallow((s) => ({
      todayBS: s.todayBS,
      holidays: s.holidays,

      setHolidaysAndToday: s.setHolidaysAndToday,
    })),
  );

export const useTimer = () =>
  useAppStore(
    useShallow((s) => ({
      status: s.status,
      elapsedSec: s.getElapsedSec,
      start: s.start,
      endedTime: s.endedTime,
      sessions: s.sessions,
      stop: s.stop,
      endSession: s.endSession,
    })),
  );

export const useOnboard = () =>
  useAppStore(
    useShallow((s) => ({
      logo: s.logo,
      logoURL: s.logoURL,
      companyName: s.companyName,
      slug: s.slug,
      spirit: s.spirit,

      industry: s.industry,
      teamSize: s.teamSize,
      description: s.description,
      website: s.website,

      email: s.email,
      password: s.password,
      name: s.name,
      yourRole: s.yourRole,
      jobTitle: s.jobTitle,

      inviteEmail: s.inviteEmail,
      invitePassword: s.invitePassword,
      inviteRole: s.inviteRole,
      invites: s.invites,

      step: s.step,
      nextStep: s.nextStep,
      prevStep: s.prevStep,
      setLogoURL: s.setLogoURL,
    })),
  );
