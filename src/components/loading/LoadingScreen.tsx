"use client";

import Image from "next/image";
import { campaign } from "./campaign";
import { IconCare, IconParcel, IconTag } from "./TrustIcons";

type Props = {
  /** 0–1, tiến trình tải thật */
  progress: number;
  /** Đang mờ dần để nhường chỗ cho trang chính */
  leaving: boolean;
  /** Quá thời gian tối đa: vẫn cho đi tiếp nhưng đổi nhãn trạng thái */
  timedOut: boolean;
};

const trust = [
  { Icon: IconTag, title: "Sản phẩm chính hãng", note: "Cam kết chất lượng" },
  { Icon: IconParcel, title: "Giao hàng toàn quốc", note: "Nhanh chóng – An toàn" },
  { Icon: IconCare, title: "Hỗ trợ tận tâm", note: "Luôn bên bạn" },
];

export function LoadingScreen({ progress, leaving, timedOut }: Props) {
  const pct = Math.round(progress * 100);
  const hasPhoto = Boolean(campaign.desktop || campaign.mobile);

  return (
    <div
      className={`ls-screen ${leaving ? "ls-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={!leaving}
    >
      {/* ---- Nền campaign ---- */}
      <div className="ls-backdrop" aria-hidden={hasPhoto ? undefined : true}>
        {hasPhoto ? (
          <picture className="ls-photo">
            {campaign.mobile && (
              <source media="(max-width: 767px)" srcSet={campaign.mobile} />
            )}
            <img
              src={campaign.desktop ?? campaign.mobile ?? ""}
              alt={campaign.alt}
              fetchPriority="high"
              decoding="async"
              style={
                {
                  "--focal-desktop": campaign.focalPoint.desktop,
                  "--focal-mobile": campaign.focalPoint.mobile,
                } as React.CSSProperties
              }
            />
          </picture>
        ) : (
          <div className="ls-placeholder" />
        )}
        <div className="ls-overlay" />
      </div>

      {/* ---- Góc trên ---- */}
      <header className="ls-top">
        <div className="ls-brand">
          <Image
            src="/brand/solisst-logo.png"
            alt="SOLISST"
            width={1430}
            height={370}
            priority
            className="ls-logo"
          />
          <span className="ls-brandLine">Fashion / Lifestyle / You</span>
        </div>
        <div className="ls-tagline">
          <span>Be your best self</span>
          <span className="ls-rule" />
        </div>
      </header>

      {/* ---- Khối trung tâm ---- */}
      <div className="ls-center">
        <p className="ls-welcome">Chào mừng bạn đến với</p>
        <h1 className="ls-wordmark">Solisst</h1>
        <p className="ls-subline">Fashion / Lifestyle / You</p>

        <div
          className="ls-progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label="Tiến trình tải"
        >
          <span className="ls-track" />
          <span className="ls-fill" style={{ transform: `scaleX(${progress})` }} />
          <span className="ls-needle" style={{ left: `${pct}%` }} />
        </div>
        <p className="ls-status">
          {timedOut ? "Tiếp tục…" : leaving ? "Sẵn sàng" : "Đang tải…"}
        </p>
      </div>

      {/* ---- Tiện ích cuối ---- */}
      <ul className="ls-trust">
        {trust.map(({ Icon, title, note }) => (
          <li key={title} className="ls-trustItem">
            <Icon className="ls-trustIcon" />
            <span className="ls-trustTitle">{title}</span>
            <span className="ls-trustNote">{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
