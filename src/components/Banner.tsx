import { env } from "@/data/env/client";
import React from "react";

type Mappings = {
  coupon: string;
  discount: string;
  country?: string;
};

type Customization = {
  backgroundColor: string;
  textColor: string;
  fontSize: string;
  isSticky: boolean;
  classPrefix?: string | null;
};

type BannerProps = {
  canRemoveBrand: boolean;
  message: string;
  mappings: Mappings;
  customization: Customization;
};

export function Banner({
  message,
  canRemoveBrand,
  mappings,
  customization,
}: BannerProps) {
  const prefix = customization.classPrefix ?? "";
  const mappedMessage = Object.entries(mappings).reduce(
    (acc, [key, value]: [string, string]) => {
      const regex = new RegExp(`{${key}}`, "g");
      return acc.replace(regex, value);
    },
    message.replace(/'/g, "&#39;")
  );

  return (
    <>
      <style type="text/css">
        {`
          .${prefix}banner-container {
            all: revert;
            display: flex;
            flex-direction: column;
            gap: .5em;
            background-color: ${customization.backgroundColor};
            color: ${customization.textColor};
            font-size: ${customization.fontSize};
            font-family: inherit;
            padding: 1rem;
            ${customization.isSticky ? "position: sticky;" : ""}
            left: 0;
            right: 0;
            top: 0;
            text-wrap: balance;
            text-align: center;
          }

          .${prefix}banner-branding {
            color: inherit;
            font-size: inherit;
            display: inline-block;
            text-decoration: underline;
          }
        `}
      </style>

      <div
        className={`${prefix}banner-container ${prefix}banner-container-override`}
      >
        <span
          className={`${prefix}banner-message ${prefix}banner-override`}
          dangerouslySetInnerHTML={{ __html: mappedMessage }}
        />
        {!canRemoveBrand && (
          <a
            className={`${prefix}banner-branding`}
            href={`${env.NEXT_PUBLIC_SERVER_URL}`}
          >
            Powered by Price Pulse
          </a>
        )}
      </div>
    </>
  );
}
