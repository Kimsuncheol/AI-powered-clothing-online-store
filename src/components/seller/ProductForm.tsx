'use client';

import React, { useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  Checkbox,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { SellerProduct, SellerProductVariant } from '@/src/types/product';
import { ProductAiTools } from './ProductAiTools';
import { ProductAvatarSettings } from './ProductAvatarSettings';
import { ProductFormActions } from './ProductFormActions';

export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  categories: string[];
  tags: string[];
  stock: number;
  variants: SellerProductVariant[];
  images: string[];
}

interface ProductFormProps {
  product?: SellerProduct;
  availableCategories: string[];
  onSubmit: (values: ProductFormValues, options: { publish: boolean }) => Promise<void> | void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const createEmptyVariant = (): SellerProductVariant => ({
  id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
  name: '',
  options: [],
});

const createDefaultValues = (): ProductFormValues => ({
  name: '',
  description: '',
  price: 0,
  categories: [],
  tags: [],
  stock: 0,
  variants: [createEmptyVariant()],
  images: [],
});

const buildInitialValues = (product?: SellerProduct): ProductFormValues =>
  product
    ? {
        name: product.name,
        description: product.description,
        price: product.price,
        categories: product.categories,
        tags: product.tags || [],
        stock: product.stock,
        variants: product.variants.length ? product.variants : [createEmptyVariant()],
        images: product.images,
      }
    : createDefaultValues();

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  availableCategories,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [values, setValues] = useState<ProductFormValues>(() => buildInitialValues(product));
  const [newTag, setNewTag] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleFieldChange = <K extends keyof ProductFormValues>(field: K, value: ProductFormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategoriesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    handleFieldChange('categories', typeof value === 'string' ? value.split(',') : value);
  };

  const handleVariantChange = <K extends keyof SellerProductVariant>(
    index: number,
    key: K,
    value: SellerProductVariant[K]
  ) => {
    setValues((prev) => {
      const variants = [...prev.variants];
      variants[index] = { ...variants[index], [key]: value };
      return { ...prev, variants };
    });
  };

  const handleVariantOptionsChange = (index: number, value: string) => {
    const options = value
      .split(',')
      .map((option) => option.trim())
      .filter(Boolean);
    handleVariantChange(index, 'options', options);
  };

  const addVariant = () => {
    setValues((prev) => ({ ...prev, variants: [...prev.variants, createEmptyVariant()] }));
  };

  const removeVariant = (index: number) => {
    setValues((prev) => {
      const nextVariants = prev.variants.filter((_, i) => i !== index);
      return { ...prev, variants: nextVariants.length ? nextVariants : [createEmptyVariant()] };
    });
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    setValues((prev) => ({ ...prev, tags: Array.from(new Set([...prev.tags, newTag.trim()])) }));
    setNewTag('');
  };

  const handleRemoveTag = (tag: string) => {
    setValues((prev) => ({ ...prev, tags: prev.tags.filter((item) => item !== tag) }));
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setValues((prev) => ({ ...prev, images: [...prev.images, newImageUrl.trim()] }));
    setNewImageUrl('');
  };

  const handleRemoveImage = (url: string) => {
    setValues((prev) => ({ ...prev, images: prev.images.filter((image) => image !== url) }));
  };

  const handleSubmit = (options: { publish: boolean }) => {
    onSubmit(values, options);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit({ publish: true });
  };

  const availableCategoryOptions = useMemo(
    () => Array.from(new Set([...availableCategories, ...values.categories])),
    [availableCategories, values.categories]
  );

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h6">General Information</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Name, description, categories, price, and tags.
                    </Typography>
                  </Box>

                  <TextField
                    label="Product name"
                    value={values.name}
                    onChange={(event) => handleFieldChange('name', event.target.value)}
                    required
                    fullWidth
                  />

                  <TextField
                    label="Description"
                    value={values.description}
                    onChange={(event) => handleFieldChange('description', event.target.value)}
                    minRows={4}
                    multiline
                    required
                    fullWidth
                  />

                  <TextField
                    label="Price"
                    type="number"
                    value={values.price}
                    onChange={(event) => handleFieldChange('price', Number(event.target.value))}
                    fullWidth
                  />

                  <FormControl fullWidth>
                    <InputLabel>Categories</InputLabel>
                    <Select
                      label="Categories"
                      multiple
                      value={values.categories}
                      onChange={handleCategoriesChange}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {availableCategoryOptions.map((category) => (
                        <MenuItem key={category} value={category}>
                          <Checkbox checked={values.categories.indexOf(category) > -1} />
                          <ListItemText primary={category} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Stack spacing={1}>
                    <Typography variant="subtitle2">Tags</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {values.tags.map((tag) => (
                        <Chip key={tag} label={tag} onDelete={() => handleRemoveTag(tag)} />
                      ))}
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <TextField
                        label="Add tag"
                        value={newTag}
                        onChange={(event) => setNewTag(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            handleAddTag();
                          }
                        }}
                        fullWidth
                      />
                      <IconButton color="primary" onClick={handleAddTag}>
                        <AddIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h6">Inventory & Variants</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Track stock and define product options such as size or color.
                    </Typography>
                  </Box>

                  <TextField
                    label="Stock"
                    type="number"
                    value={values.stock}
                    onChange={(event) => handleFieldChange('stock', Number(event.target.value))}
                  />

                  <Stack spacing={2}>
                    {values.variants.map((variant, index) => (
                      <Card key={variant.id} variant="outlined">
                        <CardContent>
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Typography variant="subtitle2" flexGrow={1}>
                                Variant {index + 1}
                              </Typography>
                              <IconButton onClick={() => removeVariant(index)} size="small">
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Stack>
                            <TextField
                              label="Variant name"
                              value={variant.name}
                              onChange={(event) => handleVariantChange(index, 'name', event.target.value)}
                              placeholder="Size, Color, Material, etc."
                            />
                            <TextField
                              label="Options (comma separated)"
                              value={variant.options.join(', ')}
                              onChange={(event) => handleVariantOptionsChange(index, event.target.value)}
                              placeholder="S, M, L or Black, White, Olive"
                            />
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                    <IconButton onClick={addVariant} color="primary">
                      <AddIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h6">Images</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Add existing media URLs or drop in previews from the AI avatar generator.
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1}>
                    <TextField
                      label="Image URL"
                      value={newImageUrl}
                      onChange={(event) => setNewImageUrl(event.target.value)}
                      fullWidth
                    />
                    <IconButton color="primary" onClick={handleAddImage}>
                      <AddIcon />
                    </IconButton>
                  </Stack>

                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {values.images.map((image) => (
                      <Box
                        key={image}
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 2,
                          overflow: 'hidden',
                          position: 'relative',
                          bgcolor: 'grey.100',
                        }}
                      >
                        <Box
                          component="img"
                          src={image}
                          alt="Product"
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <IconButton
                          size="small"
                          sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'background.paper' }}
                          onClick={() => handleRemoveImage(image)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <ProductAiTools
              name={values.name}
              categories={values.categories}
              description={values.description}
              tags={values.tags}
              onDescriptionGenerated={(description) => handleFieldChange('description', description)}
              onTagsGenerated={(tags, categoriesFromAi) =>
                setValues((prev) => ({
                  ...prev,
                  tags: Array.from(new Set([...prev.tags, ...tags])),
                  categories: categoriesFromAi?.length
                    ? Array.from(new Set([...prev.categories, ...categoriesFromAi]))
                    : prev.categories,
                }))
              }
            />

            <ProductAvatarSettings
              productId={product?.id}
              onImagesGenerated={(images) =>
                setValues((prev) => ({
                  ...prev,
                  images: Array.from(new Set([...images, ...prev.images])),
                }))
              }
            />

            <ProductFormActions
              onCancel={onCancel}
              onSaveDraft={() => handleSubmit({ publish: false })}
              onPublish={() => handleSubmit({ publish: true })}
              isSubmitting={isSubmitting}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
