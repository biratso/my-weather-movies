# App Icons and Splash Screens for Variants

This document explains how to create variant-specific icons and splash screens for Green and Orange editions.

## Directory Structure

```
assets/
  images/
    green/
      icon.png              (1024x1024 - Green themed)
      adaptive-icon.png     (1024x1024 - Green themed)
      splash-icon.png       (2048x2048 - Green themed)
    orange/
      icon.png              (1024x1024 - Orange themed)
      adaptive-icon.png     (1024x1024 - Orange themed)
      splash-icon.png       (2048x2048 - Orange themed)
```

## Icon Requirements

### App Icon (icon.png)
- Size: 1024x1024 px
- Format: PNG with transparency
- Content: Your app logo with variant color theme
- Green Edition: Use #10B981 as primary color
- Orange Edition: Use #F97316 as primary color

### Adaptive Icon (adaptive-icon.png) - Android only
- Size: 1024x1024 px
- Format: PNG with transparency
- Safe area: Keep important content within center 512x512 px
- The outer 512px border may be masked on different devices

### Splash Screen (splash-icon.png)
- Size: 2048x2048 px or larger
- Format: PNG with transparency
- Content: App logo or branding
- Background color is set in app.config.js

## Quick Setup

### Option 1: Use Design Tools
1. Open Figma, Sketch, or Adobe Illustrator
2. Create 1024x1024 canvas
3. Design your app icon with appropriate color theme
4. Export as PNG with transparency
5. Save to respective folders

### Option 2: Use Online Tools
- [App Icon Generator](https://www.appicon.co/) - Generate all sizes
- [MakeAppIcon](https://makeappicon.com/) - Free icon generator
- [Figma](https://www.figma.com/) - Free design tool

### Option 3: Use Expo Icon Template
```bash
# Download the template
curl -O https://github.com/expo/expo/blob/main/templates/expo-template-blank/assets/images/icon.png

# Modify the color in your image editor
# Save as green/icon.png and orange/icon.png
```

## Current Setup

The app.config.js is already configured to use variant-specific icons:
- Green variant reads from `assets/images/green/`
- Orange variant reads from `assets/images/orange/`

## Testing

After adding your icons, test them:

```bash
# Preview in development
npx expo start

# Build to see actual icons
npm run build:android:green
npm run build:android:orange
```

## Tips

1. **Keep it simple**: Icons should be recognizable at small sizes (48x48 px)
2. **Use solid colors**: Avoid gradients that may not scale well
3. **Test on devices**: Icons look different on various screens
4. **Maintain consistency**: Use the same logo/symbol, just different colors
5. **Background**: Use transparent backgrounds for icons, solid for splash

## Example Design

### Green Edition
- Primary color: #10B981 (Emerald green)
- Background: White or transparent
- Symbol: Your app logo with green accents

### Orange Edition
- Primary color: #F97316 (Bright orange)
- Background: White or transparent
- Symbol: Your app logo with orange accents
