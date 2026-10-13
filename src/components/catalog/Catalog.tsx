"use client";

import { useMemo, useState } from "react";
import { items, type Item } from "@/lib/collection";
import { ProductCard } from "./ProductCard";

type Group = "all" | Item["group"];
type Sort = "popular" | "price-asc" | "price-desc" | "new";

const toNumber = (p: string | null) => (p ? Number(p.replace(/\D/g, "")) : Infinity);

/** Lưới toàn bộ sản phẩm với bộ lọc nhóm và sắp xếp, chạy hoàn toàn ở client. */
export function Catalog() {
  const [group, setGroup] = useState<Group>("all");
  const [sort, setSort] = useState<Sort>("popular");

  const list = useMemo(() => {
    const filtered = group === "all" ? items : items.filter((i) => i.group === group);
    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => toNumber(a.price) - toNumber(b.price));
        break;
      case "price-desc":
        sorted.sort((a, b) => toNumber(b.price) - toNumber(a.price));
        break;
      case "new":
        sorted.sort((a, b) => Number(b.badge === "Mới về") - Number(a.badge === "Mới về"));
        break;
      default:
        sorted.sort((a, b) => b.sold - a.sold);
    }
    return sorted;
  }, [group, sort]);

  const groups: { id: Group; label: string }[] = [
    { id: "all", label: "Tất cả" },
    { id: "dam", label: "Đầm" },
    { id: "mac-nha", label: "Bộ mặc nhà" },
  ];

  return (
    <section id="tat-ca" className="ct-all" aria-labelledby="all-title">
      <div className="ct-all__head">
        <h2 id="all-title" className="hm-h2">Tất cả sản phẩm</h2>
        <div className="ct-tools">
          <div className="ct-chips" role="group" aria-label="Lọc theo nhóm">
            {groups.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`ct-chip ${group === g.id ? "is-on" : ""}`}
                aria-pressed={group === g.id}
                onClick={() => setGroup(g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>
          <label className="ct-sort">
            <span>Sắp xếp</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="popular">Bán chạy</option>
              <option value="new">Mới về</option>
              <option value="price-asc">Giá thấp đến cao</option>
              <option value="price-desc">Giá cao đến thấp</option>
            </select>
          </label>
        </div>
      </div>
      <p className="ct-count">{list.length} sản phẩm</p>
      <ul className="hm-grid">
        {list.map((it) => (
          <ProductCard key={it.slug} item={it} />
        ))}
      </ul>
    </section>
  );
}
