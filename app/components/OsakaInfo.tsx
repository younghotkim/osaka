"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Volume2 } from "lucide-react";
import { osakaInfoCards, osakaPhrases } from "@/lib/osaka-info";
import { speak, ttsSupported } from "@/lib/speak";

export function OsakaInfo() {
  const [open, setOpen] = useState(false);

  return (
    <section className={open ? "info-block info-block--open" : "info-block"}>
      <button className="info-block__head" onClick={() => setOpen((v) => !v)}>
        <span className="info-block__title">🇯🇵 오사카 정보</span>
        <span className="info-block__sub">긴급 연락처 · 돈 · 교통 · 비상 일본어</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open && (
        <div className="info-block__body">
          {osakaInfoCards.map((card) => (
            <div key={card.id} className="info-card">
              <h4>{card.emoji} {card.title}</h4>
              <dl>
                {card.lines.map((line) => (
                  <div key={line.label} className="info-line">
                    <dt>{line.label}</dt>
                    <dd>
                      {line.value}
                      {line.note && <em>{line.note}</em>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <div className="info-card info-card--phrases">
            <h4>🗣️ 비상 일본어 {ttsSupported() && <small>— 🔊를 누르면 대신 말해줘요</small>}</h4>
            <ul>
              {osakaPhrases.map((p) => (
                <li key={p.zh}>
                  <span className="info-phrase__ko">{p.ko}</span>
                  <span className="info-phrase__zh">{p.zh}</span>
                  <span className="info-phrase__pinyin">{p.pinyin}</span>
                  {ttsSupported() && (
                    <button
                      className="info-phrase__speak"
                      aria-label={`"${p.ko}" 일본어로 듣기`}
                      onClick={() => void speak(p.zh, "ja")}
                    >
                      <Volume2 size={13} />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
