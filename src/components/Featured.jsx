// src/components/Featured.jsx
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import PropertyCard from "./PropertyCard.jsx";

export default function Featured() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Intentamos ordenar por createdAt desc (puede pedir índice compuesto)
    const q = query(
      collection(db, "properties"),
      where("featured", "==", true),
      orderBy("createdAt", "desc"),
      limit(6)
    );

    // Suscripción en vivo
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            ...data,
            priceUSD: data.price ?? data.priceUSD ?? 0,
            images: Array.isArray(data.images) ? data.images : [],
          };
        });
        setItems(rows);
      },
      // Si falta índice, caemos a una consulta sin orderBy
      (err) => {
        if (err?.code === "failed-precondition") {
          const qFallback = query(
            collection(db, "properties"),
            where("featured", "==", true),
            limit(6)
          );
          onSnapshot(qFallback, (snap) => {
            const rows = snap.docs.map((d) => {
              const data = d.data();
              return {
                id: d.id,
                ...data,
                priceUSD: data.price ?? data.priceUSD ?? 0,
                images: Array.isArray(data.images) ? data.images : [],
              };
            });
            setItems(rows);
          });
        } else {
          console.error(err);
        }
      }
    );

    return unsub;
  }, []);

  if (!items.length) return null;

  return (
    <div className="grid">
      {items.map((p) => (
        <PropertyCard key={p.id} p={p} />
      ))}
    </div>
  );
}


