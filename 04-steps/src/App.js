import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

export default function App() {
  return (
    <div>
      <Steps />
      {/* <Steps /> */}
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep(s => s - 1);
  }
  function handleNext() {
    if (step < 3) setStep(s => s + 1);
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen(open => !open)}>
        {isOpen ? 'x' : '-'}
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <Buttons
              textColor="#fff"
              bgColor="#7950f2"
              onClick={handlePrevious}
            >
              👈 Previous
            </Buttons>

            <Buttons textColor="#fff" bgColor="#7950f2" onClick={handleNext}>
              Next 👉
            </Buttons>
          </div>
        </div>
      )}
    </div>
  );
}

function Buttons({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ color: textColor, backgroundColor: bgColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
