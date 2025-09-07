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
}

// Random shuffle helper
const shuffle = <T,>(arr: T[]) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Build slip with randomized search
const buildSlip = (games: Game[], targetOdd: number, attempts = 1000) => {
  let bestSlip: Game[] = [];
  let bestDiff = Infinity;

  for (let a = 0; a < attempts; a++) {
    let shuffled = shuffle(games);
    let sum = 0;
    let slip: Game[] = [];

    for (let g of shuffled) {
      if (sum < targetOdd) {
        sum += g.gameOdd;
        slip.push(g);
      }
      if (sum >= targetOdd) break;
    }

    const diff = Math.abs(sum - targetOdd);
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
    if (result && result.length > 0) {
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
            <ModalHeader className="flex flex-col gap-1">
              Build Odds From Betslip
            </ModalHeader>
            <ModalBody>
              {/* Preset Odds */}
              <div className="flex gap-2 my-2">
                {[2, 5, 10].map((o) => (
                  <Button
                    key={o}
                    
                    onPress={() => handleBuild(o)}
                    className="w-full"
                    radius="sm"
                  >
                    {o}
                  </Button>
                ))}
              </div>

              {/* Custom Odd */}
              <div className="flex gap-2 items-center my-2">
                <Input
                  placeholder="Enter custom odd"
                  type="number"
                  onChange={(e) => setTargetOdd(Number(e.target.value))}
                  radius="sm"
                />
                <Button
                  color="success"
                  onPress={() => targetOdd && handleBuild(targetOdd)}
                  className="bg-primarymain text-white"
                  radius="none"
                >
                  Build
                </Button>
              </div>

              {/* Result */}
              <div className="mt-4">
                {finalSlip && (
                  <div>
                    <h3 className="font-semibold mb-2">
                      Your Slip (target {targetOdd})
                    </h3>
                    {finalSlip.map((g) => (
                      <p key={g.id} className="text-sm">
                        {g.homeTeam} vs {g.awayTeam} — Odd {g.gameOdd}
                      </p>
                    ))}
                    <p className="mt-2 text-sm text-gray-500">
                      Final sum of odds:{" "}
                      {finalSlip
                        .reduce((acc, g) => acc + g.gameOdd, 0)
                        .toFixed(2)}
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
                    // reset state when closing
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
