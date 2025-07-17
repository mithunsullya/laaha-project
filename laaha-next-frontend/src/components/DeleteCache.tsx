"use client"

import React from 'react'
// To delete the cache storage from service worker. As service worker was causing issue on PA.
const DeleteCache = () => {
    if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }
      
  return (
    <></>
  )
}

export default DeleteCache