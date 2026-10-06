// DecorMatrix Landing Page Interactive Logic
// Lightweight, lightning-fast Vanilla JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Mobile Navigation Toggle
  // ==========================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll', navMenu.classList.contains('active'));
    });

    // Close mobile nav when clicking any link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // ==========================================
  // 2. Sticky Navbar Glassmorphism on Scroll
  // ==========================================
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // ==========================================
  // 4. FAQ Accordion Logic
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close all other accordion items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const chevron = otherItem.querySelector('.faq-chevron');
          if (chevron) chevron.textContent = '+';
        });

        // Toggle current item
        if (!isOpen) {
          item.classList.add('active');
          const chevron = item.querySelector('.faq-chevron');
          if (chevron) chevron.textContent = '−';
        }
      });
    }
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
    const firstChevron = faqItems[0].querySelector('.faq-chevron');
    if (firstChevron) firstChevron.textContent = '−';
  }

  // ==========================================
  // 5. Sample PDF Preview Modal
  // ==========================================
  const btnPreviewPdf = document.getElementById('btnPreviewSamplePdf');
  const pdfModal = document.getElementById('pdfModal');
  const btnClosePdf = document.getElementById('btnClosePdfModal');

  function openPdfModal() {
    if (pdfModal) {
      pdfModal.classList.add('active');
      document.body.classList.add('no-scroll');
    }
  }

  function closePdfModal() {
    if (pdfModal) {
      pdfModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  }

  if (btnPreviewPdf) {
    btnPreviewPdf.addEventListener('click', (e) => {
      e.preventDefault();
      openPdfModal();
    });
  }

  if (btnClosePdf) {
    btnClosePdf.addEventListener('click', closePdfModal);
  }

  if (pdfModal) {
    pdfModal.addEventListener('click', (e) => {
      if (e.target === pdfModal) {
        closePdfModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal && pdfModal.classList.contains('active')) {
      closePdfModal();
    }
  });
});
