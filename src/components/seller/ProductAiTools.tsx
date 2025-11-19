'use client';

import React, { useState } from 'react';
import { Alert, Button, Paper, Stack, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StyleIcon from '@mui/icons-material/Style';
import { aiSellerApi } from '@/src/lib/api/aiSeller';

interface ProductAiToolsProps {
  name: string;
  categories: string[];
  description: string;
  tags: string[];
  onDescriptionGenerated: (description: string) => void;
  onTagsGenerated: (tags: string[], categories?: string[]) => void;
}

export const ProductAiTools: React.FC<ProductAiToolsProps> = ({
  name,
  categories,
  description,
  tags,
  onDescriptionGenerated,
  onTagsGenerated,
}) => {
  const [aiError, setAiError] = useState<string | null>(null);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);

  const handleGenerateDescription = async () => {
    if (!name) {
      setAiError('Please enter a product name before requesting an AI description.');
      return;
    }

    setAiError(null);
    setIsGeneratingDescription(true);

    try {
      const response = await aiSellerApi.generateDescription({
        name,
        categories,
        tags,
        brief: description.slice(0, 120),
      });
      onDescriptionGenerated(response.description);
    } catch (error) {
      console.error('Failed to generate description', error);
      setAiError('Unable to generate a description right now. Please try again.');
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const handleGenerateTags = async () => {
    if (!name) {
      setAiError('Please enter a product name before requesting AI tags.');
      return;
    }

    setAiError(null);
    setIsGeneratingTags(true);

    try {
      const response = await aiSellerApi.generateTags({
        name,
        description,
        categories,
      });
      onTagsGenerated(response.tags, response.categories);
    } catch (error) {
      console.error('Failed to generate tags', error);
      setAiError('Unable to generate tags right now. Please try again.');
    } finally {
      setIsGeneratingTags(false);
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">AI Seller Assistant</Typography>
        <Typography variant="body2" color="text.secondary">
          Let the assistant craft persuasive descriptions or SEO-friendly tag suggestions based on your
          current inputs.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AutoAwesomeIcon />}
          onClick={handleGenerateDescription}
          disabled={isGeneratingDescription}
        >
          {isGeneratingDescription ? 'Generating...' : 'Generate description'}
        </Button>

        <Button
          variant="outlined"
          startIcon={<StyleIcon />}
          onClick={handleGenerateTags}
          disabled={isGeneratingTags}
        >
          {isGeneratingTags ? 'Generating...' : 'Generate tags'}
        </Button>

        {aiError && (
          <Alert severity="warning" onClose={() => setAiError(null)}>
            {aiError}
          </Alert>
        )}
      </Stack>
    </Paper>
  );
};
