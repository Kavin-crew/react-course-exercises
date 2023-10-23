import { useState, useEffect } from 'react';

// key is the keyboard keypress
// action is the callback what function will be executed
export function useKey(key, action) {
  useEffect(
    function () {
      function EscKey(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener('keydown', EscKey);

      return function () {
        document.removeEventListener('keydown', EscKey);
      };
    },
    [action, key]
  );
}
