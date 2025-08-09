"use client"
import MFAEnrollment from "@/components/auth0/MFAEnrollment";
  const factors = [
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
          onCreate={async (factor: string) => {
            return { enrollment: { ticket_url: "https://auth0.com" }, status: 200 };
          }}
          onDelete={async (enrollmentId: string) => {
            return { status: 200 };
          }}
        />;
}
