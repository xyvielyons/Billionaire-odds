"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";

interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  gameOdd: number;
  marketName: string;
  matchDate: Date;
  matchTime: string;
}

// Format date nicely
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Random shuffle
const shuffle = <T,>(arr: T[]) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Build slip toward target odds
const buildSlip = (games: Game[], targetOdd: number, attempts = 1000) => {
  let bestSlip: Game[] = [];
  let bestDiff = Infinity;

  for (let i = 0; i < attempts; i++) {
    const shuffled = shuffle(games);
    let product = 1;
    let slip: Game[] = [];

    for (const g of shuffled) {
      if (product < targetOdd) {
        product *= g.gameOdd;
        slip.push(g);
      }
      if (product >= targetOdd) break;
    }

    const diff = Math.abs(product - targetOdd);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestSlip = slip;
    }
  }

  return bestSlip.length > 0 ? bestSlip : null;
};

export default function MainBetslipBuilderModal({
  isOpen,
  onOpenChange,
  games,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  games: Game[];
}) {
  const [targetOdd, setTargetOdd] = useState<number | null>(null);
  const [finalSlip, setFinalSlip] = useState<Game[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBuild = (odd: number) => {
    setTargetOdd(odd);
    const result = buildSlip(games, odd);

    if (result) {
      setFinalSlip(result);
      setError(null);
    } else {
      setFinalSlip(null);
      setError("Could not compute odds with current games.");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Build Odds From Betslip</ModalHeader>
            <ModalBody>
              {/* Quick select odds */}
              <div className="flex gap-2 my-2">
                {[2, 5, 10].map((o) => (
                  <Button key={o} onPress={() => handleBuild(o)} className="w-full">
                    {o}
                  </Button>
                ))}
              </div>

              {/* Custom input */}
              <div className="flex gap-2 items-center my-2">
                <Input
                  placeholder="Enter custom odd"
                  type="number"
                  onChange={(e) => setTargetOdd(Number(e.target.value))}
                />
                <Button
                  color="success"
                  onPress={() => targetOdd && handleBuild(targetOdd)}
                  className="bg-primarymain text-white"
                >
                  Build
                </Button>
              </div>

              {/* Output */}
              {/* Output */}
              <div className="mt-4">
                {finalSlip && (
                  <div className="max-h-[300px] overflow-y-auto pr-2">
                    <h3 className="font-semibold mb-3">
                      Your Slip (target {targetOdd})
                    </h3>

                    {finalSlip.map((g) => (
                      <div key={g.id} className="mb-3 border-1.5 p-1.5 rounded-sm">
                        <p className="text-sm font-semibold">
                          {g.homeTeam} vs {g.awayTeam}
                        </p>
                        <p className="text-xs text-gray-500">
                          Market: {g.marketName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(g.matchDate)} • {g.matchTime}
                        </p>
                        <p className="text-sm font-medium mt-1">Odd: {g.gameOdd}</p>
                      </div>
                    ))}

                    <p className="mt-3 text-sm text-gray-600">
                      Final total odd:{" "}
                      {finalSlip.reduce((acc, g) => acc * g.gameOdd, 1).toFixed(2)}
                    </p>
                  </div>
                )}

                {error && <p className="text-red-500">{error}</p>}
              </div>

            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  setTargetOdd(null);
                  setFinalSlip(null);
                  setError(null);
                  onClose();
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
