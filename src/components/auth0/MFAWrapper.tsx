"use client"
import MFAEnrollment from "@/components/auth0/MFAEnrollment";

type Factor = {
  name: string;
  enabled: boolean;
  enrollmentId?: string;
};

const factors: Factor[] = [
  {
    name: "sms",
    enabled: true,
    enrollmentId: "phone|xxxxxxxxxx",
  },
  { name: "push-notification", enabled: true },
  {
    name: "otp",
    enabled: true,
    enrollmentId: "totp|xxxxxxxxxx",
  },
  { name: "webauthn-roaming", enabled: true },
  { name: "webauthn-platform", enabled: true },
];

export default function MyMFA() {
  return <MFAEnrollment
          factors={factors}
          onFetch={async () => {
            return { factors, status: 200 };
          }}
          onCreate={async () => {
            return { enrollment: { ticket_url: "https://auth0.com" }, status: 200 };
          }}
          onDelete={async () => {
            return { status: 200 };
          }}
        />;
}
