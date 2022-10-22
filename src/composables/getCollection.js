import { projectFirestore } from "@/firebase/config";
import { ref, watchEffect } from "vue";

const getCollection = (collection) => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt', 'asc');
  
  const unsub = collectionRef.onSnapshot(snap => {
    let results = [];
    snap.docs.forEach(doc => {
      //มีการเช็คค่า createdAt ก่อนเพิ่มรันคำสั่งต่อไป
      doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
    })
    documents.value = results;
    error.value = null;
  }, (err) => {
    console.log(err.message);
    documents.value = null;
    error.value = 'could not fetch data';
  })

  watchEffect((onInvalidate) => {
    //unsub  จาก collection ก่อนหน้า เมื่อ watcher หยุดไปแล้ว (component unMounted)
    onInvalidate(() => unsub())
  })

  return { documents, error }
}

export default getCollection