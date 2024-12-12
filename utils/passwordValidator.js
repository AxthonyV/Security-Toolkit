import zxcvbn from 'zxcvbn';

export function validatePassword(password) {
  const result = zxcvbn(password);
  
  return {
    score: result.score,
    crackTime: result.crack_times_display.offline_slow_hashing_1e4_per_second,
    feedback: result.feedback,
    warning: result.feedback.warning,
    suggestions: result.feedback.suggestions,
    strengthText: getStrengthText(result.score)
  };
}

function getStrengthText(score) {
  const strengths = {
    0: 'Very Weak',
    1: 'Weak',
    2: 'Fair',
    3: 'Strong',
    4: 'Very Strong'
  };
  return strengths[score];
}