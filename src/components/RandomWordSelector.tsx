"use client";

import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const wordList = [
  { word: "curl", meaning: "使捲曲" },
  { word: "damp", meaning: "潮濕的" },
  { word: "decrease", meaning: "減少" },
  { word: "deepen", meaning: "加深" },
  { word: "defeat", meaning: "挫敗" },
  { word: "definite", meaning: "明確的" },
  { word: "delicate", meaning: "細緻的" },
  { word: "dense", meaning: "密集的" },
  { word: "dependent", meaning: "依賴的" },
  { word: "destroy", meaning: "毀滅" },
  { word: "destruction", meaning: "毀壞" },
  { word: "differ", meaning: "不同" },
  { word: "dim", meaning: "昏暗的" },
  { word: "disadvantage", meaning: "不利" },
  { word: "disaster", meaning: "災難" },
  { word: "disorder", meaning: "紊亂" },
  { word: "distinct", meaning: "明顯不同的" },
  { word: "distinguish", meaning: "區別" },
  { word: "distinguished", meaning: "傑出的" },
  { word: "diverse", meaning: "多樣的" },
  { word: "diversity", meaning: "多樣性" },
  { word: "dominant", meaning: "主導的" },
  { word: "dominate", meaning: "主導" },
  { word: "doubtful", meaning: "懷疑的" },
  { word: "drain", meaning: "流失" },
  { word: "drift", meaning: "漂流" },
  { word: "drip", meaning: "滴水" },
  { word: "drown", meaning: "淹沒" },
  { word: "durable", meaning: "耐用的" },
  { word: "dusty", meaning: "布滿灰塵的" },
  { word: "elastic", meaning: "有彈性的" },
  { word: "elementary", meaning: "基本的" },
  { word: "emergency", meaning: "緊急情況" },
  { word: "enable", meaning: "使能夠" },
  { word: "endanger", meaning: "危害" },
  { word: "enlarge", meaning: "擴大" },
  { word: "enlargement", meaning: "擴大" },
  { word: "enormous", meaning: "巨大的" },
  { word: "eventual", meaning: "最終的" },
  { word: "evident", meaning: "顯而易見的" },
  { word: "expansion", meaning: "膨脹" },
  { word: "explode", meaning: "爆發" },
  { word: "expose", meaning: "使暴露" },
  { word: "exposure", meaning: "曝光" },
  { word: "extend", meaning: "延長" },
  { word: "extreme", meaning: "極端的" },
  { word: "fade", meaning: "褪色" },
  { word: "fairly", meaning: "相當地" }
];

const RandomWordSelector = () => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [numWords, setNumWords] = useState(5);
  const { toast } = useToast()

  const selectRandomWords = () => {
    const shuffled = [...wordList].sort(() => 0.5 - Math.random());
    setSelectedWords(shuffled.slice(0, numWords));
  };

  const copyToClipboard = useCallback(() => {
    const textToCopy = selectedWords.map(word => `${word.word}: ${word.meaning}`).join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: "已複製到剪貼板",
        description: "單字列表已成功複製",
      })
    });
  }, [selectedWords, toast]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>隨機單字選擇器</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="number"
            min="1"
            max={wordList.length}
            value={numWords}
            onChange={(e) => setNumWords(Math.min(Math.max(1, parseInt(e.target.value) || 1), wordList.length))}
            className="w-20"
          />
          <Button onClick={selectRandomWords}>選擇單字</Button>
        </div>
        {selectedWords.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">選中的單字：</h3>
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                複製
              </Button>
            </div>
            <ul className="list-disc pl-5">
              {selectedWords.map((word, index) => (
                <li key={index}>
                  <strong>{word.word}</strong>: {word.meaning}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RandomWordSelector;