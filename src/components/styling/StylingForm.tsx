import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Slider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StylingRequest, StylingConstraints } from '@/src/types/styling';
import { AvatarPreset } from '@/src/types/avatars';

interface StylingFormProps {
  formData: StylingRequest;
  setFormData: React.Dispatch<React.SetStateAction<StylingRequest>>;
  avatars: AvatarPreset[];
  loadingAvatars: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
  error?: string | null;
}

const OCCASIONS = ['Date', 'Job Interview', 'Party', 'Travel', 'Everyday', 'Wedding Guest', 'Gym'];
const STYLES = ['Casual', 'Street', 'Minimal', 'Formal', 'Sporty', 'Trendy', 'Vintage', 'Luxury'];
const COLORS = ['Black', 'White', 'Beige', 'Navy', 'Grey', 'Red', 'Blue', 'Green', 'Pastel'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter'];
const RISK_LEVELS = ['safe', 'normal', 'bold'];

export default function StylingForm({
  formData,
  setFormData,
  avatars,
  loadingAvatars,
  onSubmit,
  isSubmitting,
  error
}: StylingFormProps) {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleConstraintChange = (field: keyof StylingConstraints, value: any) => {
    setFormData(prev => ({
      ...prev,
      constraints: {
        ...prev.constraints,
        [field]: value
      }
    }));
  };

  const handleSizeChange = (type: 'top' | 'bottom' | 'shoes', value: string) => {
    setFormData(prev => ({
      ...prev,
      constraints: {
        ...prev.constraints,
        sizes: {
          ...prev.constraints.sizes,
          [type]: value
        }
      }
    }));
  };

  const handleColorToggle = (color: string) => {
    const currentColors = formData.constraints.colors;
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    handleConstraintChange('colors', newColors);
  };

  return (
    <Box>
      {/* Panel 1: Occasion & Style */}
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight="bold">1. Occasion & Style</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Occasion</InputLabel>
                <Select
                  value={formData.occasion}
                  label="Occasion"
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                >
                  {OCCASIONS.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Style</InputLabel>
                <Select
                  value={formData.style}
                  label="Style"
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                >
                  {STYLES.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Tell AI more about your situation"
                placeholder="e.g., I'm going to an outdoor wedding in October..."
                value={formData.freeText || ''}
                onChange={(e) => setFormData({ ...formData, freeText: e.target.value })}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Panel 2: Budget & Constraints */}
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight="bold">2. Budget & Constraints</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Budget Range ($)</Typography>
            <Slider
              value={[formData.constraints.budgetMin, formData.constraints.budgetMax]}
              onChange={(_, val) => {
                if (Array.isArray(val)) {
                  handleConstraintChange('budgetMin', val[0]);
                  handleConstraintChange('budgetMax', val[1]);
                }
              }}
              valueLabelDisplay="auto"
              min={0}
              max={2000}
              step={50}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary' }}>
              <Typography variant="body2">${formData.constraints.budgetMin}</Typography>
              <Typography variant="body2">${formData.constraints.budgetMax}+</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Preferred Colors</Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {COLORS.map((color) => (
                <Chip
                  key={color}
                  label={color}
                  onClick={() => handleColorToggle(color)}
                  color={formData.constraints.colors.includes(color) ? 'primary' : 'default'}
                  variant={formData.constraints.colors.includes(color) ? 'filled' : 'outlined'}
                  clickable
                />
              ))}
            </Stack>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Season</InputLabel>
                <Select
                  value={formData.constraints.season || ''}
                  label="Season"
                  onChange={(e) => handleConstraintChange('season', e.target.value)}
                >
                  <MenuItem value="">Any</MenuItem>
                  {SEASONS.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {/* Spacer or other field */}
            </Grid>
            <Grid size={{ xs: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Top Size</InputLabel>
                <Select
                  value={formData.constraints.sizes.top || ''}
                  label="Top Size"
                  onChange={(e) => handleSizeChange('top', e.target.value)}
                >
                  <MenuItem value="">Any</MenuItem>
                  {SIZES.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Bottom Size</InputLabel>
                <Select
                  value={formData.constraints.sizes.bottom || ''}
                  label="Bottom Size"
                  onChange={(e) => handleSizeChange('bottom', e.target.value)}
                >
                  <MenuItem value="">Any</MenuItem>
                  {SIZES.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="Shoes"
                value={formData.constraints.sizes.shoes || ''}
                onChange={(e) => handleSizeChange('shoes', e.target.value)}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Panel 3: Avatar & Advanced Options */}
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight="bold">3. Avatar & Advanced Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Avatar</InputLabel>
                <Select
                  value={formData.avatarId || ''}
                  label="Avatar"
                  onChange={(e) => setFormData({ ...formData, avatarId: e.target.value })}
                  disabled={loadingAvatars}
                >
                  <MenuItem value="">None</MenuItem>
                  {avatars.map((avatar) => (
                    <MenuItem key={avatar.id} value={avatar.id}>
                      {avatar.name}
                    </MenuItem>
                  ))}
                </Select>
                {loadingAvatars && <Typography variant="caption">Loading avatars...</Typography>}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.useProfilePreferences || false}
                    onChange={(e) => setFormData({ ...formData, useProfilePreferences: e.target.checked })}
                  />
                }
                label="Use my profile preferences (sizes, etc.)"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Style Risk Level</InputLabel>
                <Select
                  value={formData.styleRiskLevel || 'normal'}
                  label="Style Risk Level"
                  onChange={(e) => setFormData({ ...formData, styleRiskLevel: e.target.value as any })}
                >
                  {RISK_LEVELS.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Action Area */}
      <Box sx={{ mt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={onSubmit}
          disabled={isSubmitting || !formData.occasion || !formData.style}
          sx={{ py: 1.5 }}
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Generate Outfit'}
        </Button>
      </Box>
    </Box>
  );
}
