import { useHint, useOpenRouter } from "../hints/openrouter";

export const HintProvider = () => {
  const { orEnabled } = useOpenRouter();

  return orEnabled ? <Hint /> : null;
};

export const Hint = () => {
  const { hint, loading, error, getHint, cancelHint } = useHint();

  if(hint) return (
    <div style={{ padding: '10px' }}>
        <p>💡 try {hint.toUpperCase()}</p>
    </div>
  );

  return (
    <div style={{ padding: '10px' }}>
        <button onClick={getHint} disabled={loading}>
            {loading ? <span>Asking AI for a hint...</span> : 'Get Hint'}
        </button>

        {loading ? <button onClick={cancelHint}>
            Cancel
        </button> : null}

        {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};