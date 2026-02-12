import { useState } from 'react';
import { Heart, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FunQuestionsFlowProps {
  onClose: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  responses: { [key: string]: string };
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's our perfect virtual date vibe?",
    options: ["Cozy movie night 🎬", "Competitive gaming 🎮", "Deep conversation ☕", "Virtual adventure 🗺️"],
    responses: {
      "Cozy movie night 🎬": "Perfect! I'll grab the popcorn, you pick the movie! 🍿",
      "Competitive gaming 🎮": "Game on! But I'm totally winning this time! 😎",
      "Deep conversation ☕": "I love our talks, Catherine. You always know what to say. 💭",
      "Virtual adventure 🗺️": "Let's explore the world together, one screen at a time! 🌍",
    },
  },
  {
    id: 2,
    question: "When should we schedule our next video call?",
    options: ["Morning coffee ☕", "Lunch break 🍱", "Evening chill 🌙", "Late night chat 🌟"],
    responses: {
      "Morning coffee ☕": "Yes! Starting the day seeing your face is the best! ☀️",
      "Lunch break 🍱": "Perfect timing to brighten up the middle of the day! 😊",
      "Evening chill 🌙": "Can't wait to unwind and catch up with you! 🌆",
      "Late night chat 🌟": "The best conversations happen under the stars! ✨",
    },
  },
  {
    id: 3,
    question: "What online activity should we try together?",
    options: ["Watch party 📺", "Online cooking 👨‍🍳", "Virtual museum tour 🎨", "Shared playlist jam 🎵"],
    responses: {
      "Watch party 📺": "I'll sync up Netflix! Get ready for some quality binge time! 🎬",
      "Online cooking 👨‍🍳": "Let's make the same recipe and see who does it better! 🍳",
      "Virtual museum tour 🎨": "Culture and you? That's my perfect combination! 🖼️",
      "Shared playlist jam 🎵": "I'm already adding songs that remind me of you! 🎶",
    },
  },
  {
    id: 4,
    question: "How should we celebrate special moments online?",
    options: ["Virtual surprise party 🎉", "Handwritten letter pics 💌", "Custom playlist 🎵", "Video montage 📹"],
    responses: {
      "Virtual surprise party 🎉": "I'm already planning something special for you! 🎊",
      "Handwritten letter pics 💌": "There's something so romantic about your handwriting! ✍️",
      "Custom playlist 🎵": "Every song will tell our story, Catherine! 🎼",
      "Video montage 📹": "I'll compile all our best moments together! 🎥",
    },
  },
];

export default function FunQuestionsFlow({ onClose }: FunQuestionsFlowProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowResponse(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onClose();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowResponse(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-scale-in">
      <Card className="bg-white/95 dark:bg-romantic-card/95 backdrop-blur-sm border-romantic-accent shadow-2xl">
        <CardHeader className="relative text-center space-y-4 pb-4">
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-romantic-text hover:text-romantic-accent"
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="flex justify-center">
            <Heart className="w-12 h-12 text-romantic-accent fill-romantic-accent animate-pulse-slow" />
          </div>

          <CardTitle className="text-2xl md:text-3xl font-bold text-romantic-heading">
            Fun Questions for Catherine! 💕
          </CardTitle>

          <div className="flex justify-center gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentQuestionIndex
                    ? 'bg-romantic-accent w-8'
                    : index < currentQuestionIndex
                    ? 'bg-romantic-accent/50'
                    : 'bg-romantic-border'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-semibold text-romantic-heading mb-6">
              {currentQuestion.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showResponse}
                  variant={selectedOption === option ? 'default' : 'outline'}
                  size="lg"
                  className={`text-base py-6 transition-all duration-300 ${
                    selectedOption === option
                      ? 'bg-romantic-accent hover:bg-romantic-accent-dark text-white border-romantic-accent'
                      : 'border-romantic-border hover:bg-romantic-muted/30 text-romantic-text'
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {showResponse && selectedOption && (
            <Card className="bg-romantic-accent/10 border-romantic-accent/30 p-6 animate-scale-in">
              <p className="text-center text-lg text-romantic-text font-medium leading-relaxed">
                {currentQuestion.responses[selectedOption]}
              </p>
            </Card>
          )}

          {showResponse && (
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleNext}
                size="lg"
                className="bg-romantic-accent hover:bg-romantic-accent-dark text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
              >
                {isLastQuestion ? (
                  <>
                    <Heart className="w-5 h-5 mr-2 fill-current" />
                    Back to celebration!
                  </>
                ) : (
                  <>
                    Next question
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}

          <div className="flex justify-center pt-2">
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-romantic-text hover:text-romantic-accent transition-all duration-300"
            >
              Skip questions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
