export const showCompanyRestricted = () => {
  const modal = document.createElement('div');
  modal.id = 'restricted-modal';
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-200">
      <svg class="mx-auto w-16 h-16 text-red-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
      </svg>
      <h3 class="text-2xl font-bold text-gray-900 mb-4">HR & Admin Only</h3>
      <p class="text-gray-600 mb-8 leading-relaxed">Post a Job and HR Dashboard features are available only for HR and Admin users.</p>
      <p class="text-sm text-gray-500 mb-6">Please login with your HR or Admin account.</p>
      <button id="close-modal-btn" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300">
        Got it, thanks!
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);

  // Event listener
  const closeBtn = modal.querySelector('#close-modal-btn') as HTMLButtonElement;
  closeBtn.onclick = () => {
    modal.classList.add('animate-out', 'fade-out', 'zoom-out');
    setTimeout(() => modal.remove(), 200);
  };

  // Auto close
  setTimeout(() => {
    if (modal.parentNode) {
      modal.classList.add('animate-out', 'fade-out', 'zoom-out');
      setTimeout(() => modal.remove(), 200);
    }
  }, 5000);

  return false;
};

