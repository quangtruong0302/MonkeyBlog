import { useEffect, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "@firebase-app/firebaseConfig";

export function useFirestorePagination(
  collectionName,
  {
    pageSize = 5,
    orderField = "name",
    searchField = "name",
    searchValue = "",
  } = {}
) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCursors, setPageCursors] = useState([]);

  const fetchTotal = useCallback(async () => {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    setTotal(snapshot.size);
  }, [collectionName]);

  const fetchPage = useCallback(
    async (page = 1) => {
      setLoading(true);
      const colRef = collection(db, collectionName);
      let q;

      if (searchValue) {
        q = query(
          colRef,
          where(searchField, ">=", searchValue),
          where(searchField, "<=", searchValue + "\uf8ff"),
          orderBy(orderField),
          limit(pageSize)
        );
      } else {
        q = query(colRef, orderBy(orderField), limit(pageSize));
      }

      if (page > 1 && pageCursors[page - 2]) {
        q = query(
          colRef,
          orderBy(orderField),
          startAfter(pageCursors[page - 2]),
          limit(pageSize)
        );
      }

      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];

      setPageCursors((prev) => {
        const newCursors = [...prev];
        newCursors[page - 1] = lastVisible;
        return newCursors;
      });

      setData(docs);
      setCurrentPage(page);
      setLoading(false);
    },
    [
      collectionName,
      pageSize,
      orderField,
      searchField,
      searchValue,
      pageCursors,
    ]
  );

  useEffect(() => {
    fetchTotal();
  }, [fetchTotal]);

  useEffect(() => {
    fetchPage(1);
  }, [searchValue]);

  const totalPages = Math.ceil(total / pageSize);

  const refresh = useCallback(async () => {
    await fetchPage(currentPage);
    await fetchTotal();
  }, [fetchPage, fetchTotal, currentPage]);

  return {
    data,
    loading,
    total,
    totalPages,
    currentPage,
    fetchPage,
    refresh,
  };
}
