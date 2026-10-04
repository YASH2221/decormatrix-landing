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
  // 3. Interactive Live Mini-Calculator Demo
  // ==========================================
  let currentShape = 'L_SHAPE';
  let sideA = 10;
  let sideB = 8;
  let currentMat = 'PLYWOOD';
  let unitRate = 2150;
  let matName = 'Plywood Luxury Package';

  const shapeBtns = document.querySelectorAll('#shapeBtns .btn-shape');
  const groupSideB = document.getElementById('groupSideB');
  const rangeSideA = document.getElementById('rangeSideA');
  const rangeSideB = document.getElementById('rangeSideB');
  const valSideA = document.getElementById('valSideA');
  const valSideB = document.getElementById('valSideB');
  const matBtns = document.querySelectorAll('.btn-mat');

  const displayRft = document.getElementById('displayRft');
  const displayFormula = document.getElementById('displayFormula');
  const displayUnitRate = document.getElementById('displayUnitRate');
  const displayMatName = document.getElementById('displayMatName');
  const displayTotal = document.getElementById('displayTotal');

  function calculateQuote() {
    let netRft = 0;
    let formulaText = '';

    if (currentShape === 'STRAIGHT') {
      netRft = sideA;
      formulaText = `${sideA}ft Straight (सीधा लेआउट)`;
      if (groupSideB) groupSideB.style.display = 'none';
    } else if (currentShape === 'L_SHAPE') {
      netRft = (sideA + sideB) - 2;
      formulaText = `(${sideA} + ${sideB}) - 2ft कॉर्नर कटौती`;
      if (groupSideB) groupSideB.style.display = 'block';
    } else if (currentShape === 'U_SHAPE') {
      netRft = (sideA + (sideB * 2)) - 4;
      formulaText = `(${sideA} + ${sideB} + ${sideB}) - 4ft दो कॉर्नर कटौती`;
      if (groupSideB) groupSideB.style.display = 'block';
    }

    if (netRft < 0) netRft = 0;

    // Estimated full kitchen package calculation:
    // (Base Cabinets + Wall Cabinets + Tandem Drawers + Hinges & GST)
    // Multiplier reflects average kitchen package cost relative to base running ft rate
    const estimatedTotal = Math.round(netRft * unitRate * 4.28);

    // Format numbers
    if (displayRft) displayRft.textContent = `${netRft.toFixed(1)} Rft`;
    if (displayFormula) displayFormula.textContent = formulaText;
    if (displayUnitRate) displayUnitRate.textContent = `₹${unitRate.toLocaleString('en-IN')} / Rft`;
    if (displayMatName) displayMatName.textContent = matName;
    if (displayTotal) displayTotal.textContent = `₹${estimatedTotal.toLocaleString('en-IN')}`;
  }

  // Shape button event listeners
  shapeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      shapeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentShape = btn.getAttribute('data-shape') || 'L_SHAPE';
      calculateQuote();
    });
  });

  // Slider A
  if (rangeSideA && valSideA) {
    rangeSideA.addEventListener('input', (e) => {
      sideA = parseInt(e.target.value, 10);
      valSideA.textContent = `${sideA} ft`;
      calculateQuote();
    });
  }

  // Slider B
  if (rangeSideB && valSideB) {
    rangeSideB.addEventListener('input', (e) => {
      sideB = parseInt(e.target.value, 10);
      valSideB.textContent = `${sideB} ft`;
      calculateQuote();
    });
  }

  // Material Toggle
  matBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      matBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMat = btn.getAttribute('data-mat') || 'PLYWOOD';
      unitRate = parseInt(btn.getAttribute('data-rate') || '2150', 10);
      matName = currentMat === 'PLYWOOD' ? 'Plywood Luxury Package' : '100% Waterproof PVC Package';
      calculateQuote();
    });
  });

  // Run initial calculation
  calculateQuote();

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
