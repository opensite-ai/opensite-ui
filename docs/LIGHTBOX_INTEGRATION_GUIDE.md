# Integration Guide: @page-speed/pdf-viewer & @page-speed/lightbox into @opensite-ui

**Complete step-by-step instructions for integrating both libraries into opensite-ui component ecosystem**

---

## Executive Summary

You have two fully-built npm modules:
1. **@page-speed/pdf-viewer** - Production-ready PDF viewer (1.5 weeks development)
2. **@page-speed/lightbox** - High-performance media lightbox (2-3 weeks development)

**Integration Plan:** 4 test cases across 6 component blocks
- ✅ Image carousel lightbox (masonry-motion-grid)
- ✅ Video gallery with lightbox (link-tree-block)
- ✅ PDF viewer integration (resource-detail-whitepaper-sidebar)
- ✅ Inline presentation + lightbox showcase (project-detail-architecture-carousel)

**Estimated Integration Time:** 2-3 days (1 per test case + setup)

---

## Part 1: Pre-Integration Setup 

### Step 1.1: Install Dependencies

```bash
cd opensite-ui

# Install both packages from npm (assuming already published)
npm install @page-speed/pdf-viewer @page-speed/lightbox

# Or if developing locally with npm link:
npm link ../page-speed-pdf-viewer
npm link ../page-speed-lightbox
```

### Step 1.2: Add Media Placeholders

Update `lib/mediaPlaceholders.ts` to include the architecture showcase:

```typescript
// lib/mediaPlaceholders.ts

export const architectureShowcase = {
 presentationVideoSrc:
 "https://toastability-production.s3.amazonaws.com/lzjll60wz2sjd3sx1dxx440o8st2",
 presentationPdfSrc:
 "https://cdn.ing/assets/files/record/286359/5fv7u23rr648t363fy2ibs61sflg",
 presentationSlideImages: [
 "https://cdn.ing/assets/i/r/286360/0pf2q15x4i6tnzsb9q69ebs7waxg/enh-slide1-enhanced-text-shapes-2x.png",
 "https://cdn.ing/assets/i/r/286361/xexj2n6wv9gjrll4znkknzj2g3gv/enh-slide2-enhanced-text-shapes-2x.png",
 "https://cdn.ing/assets/i/r/286362/6dv6yn4xdu6uycxvnj8xh2mn3om6/enh-slide3-enhanced-text-shapes-2x.png",
 "https://cdn.ing/assets/i/r/286363/fztoi235xnydwok5nbwqaan3av08/enh-slide4-enhanced-text-shapes-2x.png",
 "https://cdn.ing/assets/i/r/286364/t3reblt8t8d56f5sfiw7s2najw5j/enh-slide5-enhanced-text-shapes-2x.png",
 "https://cdn.ing/assets/i/r/286365/5jg6o89riei0voyrf6x9ekx50yi1/enh-slide6-enhanced-text-shapes-2x.png",
 "https://cdn.ing/assets/i/r/286366/n38048e9urnfvby7oa1jgq6zv5a6/enh-slide7-enhanced-text-shapes-2x.png",
 "https://cdn.ing/assets/i/r/286367/i5nrm6bw2h1s6ysqupo5cwr6mhs3/enh-slide8-enhanced-text-shapes-2x.png",
 "https://cdn.ing/assets/i/r/286368/uqby7ex8w16gncgp0parfu3eb39h/enh-slide9-enhanced-text-shapes-2x.png",
 "https://cdn.ing/assets/i/r/286369/zd7l9x70c9u7xojbx4twayulhi6r/enh-slide10-enhanced-text-shapes-2x.png",
 ],
};
```

### Step 1.3: Create Lightbox Context Provider (Optional but Recommended)

Create a provider for managing global lightbox state:

```typescript
// hooks/useLightboxGlobal.ts
import { useState, useCallback } from 'react';
import { LightboxItem } from '@page-speed/lightbox';

export function useLightboxGlobal() {
 const [isOpen, setIsOpen] = useState(false);
 const [items, setItems] = useState<LightboxItem[]>([]);
 const [currentIndex, setCurrentIndex] = useState(0);

 const openLightbox = useCallback((itemsList: LightboxItem[], index = 0) => {
 setItems(itemsList);
 setCurrentIndex(Math.max(0, Math.min(index, itemsList.length - 1)));
 setIsOpen(true);
 }, []);

 const closeLightbox = useCallback(() => {
 setIsOpen(false);
 }, []);

 return {
 isOpen,
 items,
 currentIndex,
 openLightbox,
 closeLightbox,
 };
}
```

### Step 1.4: Verify Package Exports

Check that both packages export correctly:

```typescript
// Test imports
import { Lightbox, useLightbox } from '@page-speed/lightbox';
import { PDFViewer } from '@page-speed/pdf-viewer';

// Both should resolve without errors
console.log('✅ Lightbox imported');
console.log('✅ PDFViewer imported');
```

---

## Part 2: Test Case 1 - Image Carousel Lightbox

### Step 2.1: Analyze masonry-motion-grid.tsx

**Current behavior:**
- Displays images in masonry layout with motion effects
- No interactivity (images are static display)

**Target behavior:**
- Clicking any image opens lightbox
- Lightbox shows all images in carousel
- Can navigate between images

### Step 2.2: Modify masonry-motion-grid.tsx

```typescript
// components/blocks/gallery/masonry-motion-grid.tsx
import { useState } from 'react';
import { Lightbox, useLightbox, type LightboxItem } from '@page-speed/lightbox';
import { MotionWrapper } from '@/components/motion/MotionWrapper';
import styles from './masonry-motion-grid.module.css';

interface MasonryMotionGridProps {
 images: Array<{
 id: string;
 src: string;
 alt?: string;
 caption?: string;
 }>;
 columns?: number;
}

export function MasonryMotionGrid({
 images,
 columns = 3,
}: MasonryMotionGridProps) {
 const lightbox = useLightbox();

 // Convert images to LightboxItem format
 const lightboxItems: LightboxItem[] = images.map((img) => ({
 id: img.id,
 type: 'image' as const,
 src: img.src,
 alt: img.alt,
 caption: img.caption,
 download: true,
 share: true,
 }));

 const handleImageClick = (index: number) => {
 lightbox.goTo(index);
 lightbox.open();
 };

 return (
 <>
 <div
 className={styles.grid}
 style={{
 gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
 }}
 >
 {images.map((image, index) => (
 <MotionWrapper key={image.id} delay={index * 0.05}>
 <div
 className={styles.imageWrapper}
 onClick={() => handleImageClick(index)}
 style={{ cursor: 'pointer' }}
 >
 <img
 src={image.src}
 alt={image.alt}
 className={styles.image}
 />
 {image.caption && (
 <div className={styles.caption}>{image.caption}</div>
 )}
 </div>
 </MotionWrapper>
 ))}
 </div>

 {/* Lightbox component */}
 {lightbox.isOpen && (
 <Lightbox
 items={lightboxItems}
 initialIndex={lightbox.currentIndex}
 layout="horizontal"
 controls={{
 navigation: true,
 thumbnails: true,
 download: true,
 share: true,
 fullscreen: true,
 captions: true,
 counter: true,
 }}
 onClose={lightbox.close}
 enableKeyboardShortcuts={true}
 closeOnEscape={true}
 />
 )}
 </>
 );
}
```

### Step 2.3: Add CSS for Click Interaction

```css
/* components/blocks/gallery/masonry-motion-grid.module.css */

.imageWrapper {
 position: relative;
 overflow: hidden;
 border-radius: 8px;
 transition: transform 150ms ease, box-shadow 150ms ease;
}

.imageWrapper:hover {
 transform: scale(1.02);
 box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.image {
 width: 100%;
 height: 100%;
 object-fit: cover;
 display: block;
}

.caption {
 position: absolute;
 bottom: 0;
 left: 0;
 right: 0;
 padding: 12px;
 background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
 color: white;
 font-size: 14px;
 font-weight: 500;
 opacity: 0;
 transition: opacity 150ms ease;
}

.imageWrapper:hover .caption {
 opacity: 1;
}
```

### Step 2.4: Testing

```typescript
// Test in your component showcase
import { MasonryMotionGrid } from '@/components/blocks/gallery/masonry-motion-grid';

export function TestMasonryLightbox() {
 const images = [
 { id: '1', src: '/img1.jpg', alt: 'Image 1', caption: 'Sample 1' },
 { id: '2', src: '/img2.jpg', alt: 'Image 2', caption: 'Sample 2' },
 // ... more images
 ];

 return <MasonryMotionGrid images={images} columns={3} />;
}
```

**Expected behavior:**
- ✅ Click image → lightbox opens
- ✅ Navigate with arrows/thumbnails
- ✅ Download button works
- ✅ Escape key closes
- ✅ Mobile responsive

---

## Part 3: Test Case 2 - Video Gallery with Lightbox

### Step 3.1: Analyze link-tree-block.tsx

**Current behavior:**
- Displays links/media items as clickable cards
- Click behavior: opens external link or media

**Target behavior:**
- Support videos + images in lightbox
- Click opens lightbox gallery
- Mix of different media types

### Step 3.2: Create VideoGallery Component

```typescript
// components/blocks/link-page/video-gallery.tsx
import { useState } from 'react';
import { Lightbox, useLightbox, type LightboxItem } from '@page-speed/lightbox';
import styles from './video-gallery.module.css';

interface MediaItem {
 id: string;
 type: 'video' | 'image';
 src: string;
 thumbnail?: string;
 title?: string;
 description?: string;
}

interface VideoGalleryProps {
 items: MediaItem[];
 layout?: 'grid' | 'list';
 columns?: number;
}

export function VideoGallery({
 items,
 layout = 'grid',
 columns = 3,
}: VideoGalleryProps) {
 const lightbox = useLightbox();

 // Convert to LightboxItem format
 const lightboxItems: LightboxItem[] = items.map((item) => ({
 id: item.id,
 type: item.type,
 src: item.src,
 title: item.title,
 caption: item.description,
 download: item.type === 'image',
 share: true,
 }));

 const handleItemClick = (index: number) => {
 lightbox.goTo(index);
 lightbox.open();
 };

 return (
 <>
 <div
 className={styles.container}
 style={{
 display: layout === 'grid' ? 'grid' : 'flex',
 gridTemplateColumns: layout === 'grid'
 ? `repeat(auto-fit, minmax(300px, 1fr))`
 : 'none',
 flexDirection: layout === 'list' ? 'column' : 'row',
 }}
 >
 {items.map((item, index) => (
 <div
 key={item.id}
 className={styles.card}
 onClick={() => handleItemClick(index)}
 >
 {/* Thumbnail/Preview */}
 <div className={styles.mediaPreview}>
 <img
 src={item.thumbnail || item.src}
 alt={item.title}
 className={styles.thumbnail}
 />

 {/* Play button overlay for videos */}
 {item.type === 'video' && (
 <div className={styles.playButton}>
 <svg
 width="48"
 height="48"
 viewBox="0 0 48 48"
 fill="white"
 >
 <path d="M16 10v28l22-14z" />
 </svg>
 </div>
 )}
 </div>

 {/* Metadata */}
 {item.title && (
 <h3 className={styles.title}>{item.title}</h3>
 )}
 {item.description && (
 <p className={styles.description}>{item.description}</p>
 )}
 </div>
 ))}
 </div>

 {/* Lightbox */}
 {lightbox.isOpen && (
 <Lightbox
 items={lightboxItems}
 initialIndex={lightbox.currentIndex}
 layout="vertical-split"
 controls={{
 navigation: true,
 thumbnails: true,
 counter: true,
 fullscreen: true,
 share: true,
 }}
 onClose={lightbox.close}
 enableKeyboardShortcuts={true}
 />
 )}
 </>
 );
}
```

### Step 3.3: Modify link-tree-block.tsx

```typescript
// components/blocks/link-page/link-tree-block.tsx
import { VideoGallery } from './video-gallery';

interface LinkTreeBlockProps {
 links: Array<{
 id: string;
 type: 'video' | 'image' | 'external' | 'download';
 src: string;
 thumbnail?: string;
 title: string;
 description?: string;
 }>;
}

export function LinkTreeBlock({ links }: LinkTreeBlockProps) {
 // Separate media items from regular links
 const mediaItems = links.filter((link) =>
 link.type === 'video' || link.type === 'image'
 );
 const regularLinks = links.filter((link) =>
 link.type === 'external' || link.type === 'download'
 );

 // If we have media items, show them in gallery first
 if (mediaItems.length > 0) {
 return (
 <div className={styles.container}>
 <VideoGallery items={mediaItems} layout="grid" columns={3} />

 {/* Regular links below */}
 {regularLinks.length > 0 && (
 <div className={styles.regularLinks}>
 {regularLinks.map((link) => (
 <a key={link.id} href={link.src} className={styles.link}>
 {link.title}
 </a>
 ))}
 </div>
 )}
 </div>
 );
 }

 // Fall back to original behavior for regular links
 return <OriginalLinkTreeBlock links={regularLinks} />;
}
```

### Step 3.4: CSS for Video Gallery

```css
/* components/blocks/link-page/video-gallery.module.css */

.container {
 gap: 24px;
 margin-bottom: 40px;
}

.card {
 cursor: pointer;
 border-radius: 12px;
 overflow: hidden;
 transition: transform 200ms ease, box-shadow 200ms ease;
}

.card:hover {
 transform: translateY(-4px);
 box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.mediaPreview {
 position: relative;
 overflow: hidden;
 aspect-ratio: 16 / 9;
 background: #f0f0f0;
}

.thumbnail {
 width: 100%;
 height: 100%;
 object-fit: cover;
}

.playButton {
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 display: flex;
 align-items: center;
 justify-content: center;
 width: 64px;
 height: 64px;
 background: rgba(0, 0, 0, 0.6);
 border-radius: 50%;
 transition: background 200ms ease, transform 200ms ease;
}

.card:hover .playButton {
 background: rgba(0, 0, 0, 0.8);
 transform: translate(-50%, -50%) scale(1.1);
}

.title {
 margin: 12px 0 8px 0;
 font-size: 16px;
 font-weight: 600;
}

.description {
 margin: 0;
 color: #666;
 font-size: 14px;
}
```

**Expected behavior:**
- ✅ Click video card → lightbox opens with video
- ✅ Click image card → lightbox opens with image
- ✅ Play button visible on hover (videos)
- ✅ Navigation between media items
- ✅ Fullscreen video playback

---

## Part 4: Test Case 3 - PDF Viewer Integration 

### Step 4.1: Analyze resource-detail-whitepaper-sidebar.tsx

**Current behavior:**
- Shows PDF link as downloadable resource
- No preview or viewing capability

**Target behavior:**
- PDF viewer embedded inline
- Download link available
- Print functionality
- Page controls visible

### Step 4.2: Modify resource-detail-whitepaper-sidebar.tsx

```typescript
// components/blocks/resource-detail/resource-detail-whitepaper-sidebar.tsx
import { useState } from 'react';
import { PDFViewer } from '@page-speed/pdf-viewer';
import styles from './resource-detail-whitepaper-sidebar.module.css';

interface WhitepaperSidebarProps {
 title: string;
 description?: string;
 pdfUrl: string;
 downloadUrl?: string;
}

export function ResourceDetailWhitepaperSidebar({
 title,
 description,
 pdfUrl,
 downloadUrl,
}: WhitepaperSidebarProps) {
 const [showFullViewer, setShowFullViewer] = useState(false);

 return (
 <aside className={styles.sidebar}>
 <div className={styles.card}>
 {/* Preview Section */}
 <div className={styles.previewSection}>
 <h3 className={styles.title}>{title}</h3>
 {description && (
 <p className={styles.description}>{description}</p>
 )}

 {/* Embedded PDF Viewer */}
 <div className={styles.pdfPreview}>
 <PDFViewer
 url={pdfUrl}
 height="400px"
 config={{
 showControls: true,
 showThumbnails: false,
 enableDownload: true,
 enablePrint: true,
 enableFullscreen: false, // Use our own fullscreen button
 initialPage: 1,
 initialZoom: 'page-fit',
 }}
 />
 </div>

 {/* Action Buttons */}
 <div className={styles.actions}>
 <button
 className={styles.buttonPrimary}
 onClick={() => setShowFullViewer(true)}
 >
 View Full Document
 </button>

 {downloadUrl && (
 <a
 href={downloadUrl}
 className={styles.buttonSecondary}
 download
 >
 Download PDF
 </a>
 )}
 </div>
 </div>

 {/* Metadata */}
 <div className={styles.metadata}>
 <div className={styles.metaItem}>
 <span className={styles.metaLabel}>Format</span>
 <span className={styles.metaValue}>PDF Document</span>
 </div>
 </div>
 </div>

 {/* Full-Screen Viewer Modal */}
 {showFullViewer && (
 <div className={styles.fullScreenModal}>
 <div className={styles.modalHeader}>
 <h2>{title}</h2>
 <button
 className={styles.closeButton}
 onClick={() => setShowFullViewer(false)}
 >
 ✕
 </button>
 </div>

 <div className={styles.modalContent}>
 <PDFViewer
 url={pdfUrl}
 height="100%"
 config={{
 showControls: true,
 showThumbnails: true,
 enableDownload: true,
 enablePrint: true,
 enableFullscreen: true,
 initialZoom: 'page-width',
 }}
 />
 </div>
 </div>
 )}
 </aside>
 );
}
```

### Step 4.3: CSS for PDF Viewer

```css
/* components/blocks/resource-detail/resource-detail-whitepaper-sidebar.module.css */

.sidebar {
 position: sticky;
 top: 20px;
 width: 100%;
 max-width: 400px;
}

.card {
 background: white;
 border: 1px solid #e0e0e0;
 border-radius: 12px;
 overflow: hidden;
 box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.previewSection {
 padding: 24px;
}

.title {
 margin: 0 0 12px 0;
 font-size: 18px;
 font-weight: 600;
}

.description {
 margin: 0 0 16px 0;
 color: #666;
 font-size: 14px;
 line-height: 1.5;
}

.pdfPreview {
 margin: 16px 0;
 border: 1px solid #f0f0f0;
 border-radius: 8px;
 overflow: hidden;
 background: #f9f9f9;
}

.actions {
 display: flex;
 flex-direction: column;
 gap: 12px;
 margin-top: 16px;
}

.buttonPrimary,
.buttonSecondary {
 padding: 12px 16px;
 border: none;
 border-radius: 8px;
 font-size: 14px;
 font-weight: 600;
 cursor: pointer;
 transition: all 200ms ease;
 text-align: center;
 text-decoration: none;
 display: block;
}

.buttonPrimary {
 background: #007bff;
 color: white;
}

.buttonPrimary:hover {
 background: #0056b3;
}

.buttonSecondary {
 background: #f0f0f0;
 color: #333;
}

.buttonSecondary:hover {
 background: #e0e0e0;
}

.metadata {
 padding: 16px 24px;
 border-top: 1px solid #f0f0f0;
 background: #fafafa;
}

.metaItem {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 8px;
}

.metaItem:last-child {
 margin-bottom: 0;
}

.metaLabel {
 font-size: 12px;
 color: #999;
 font-weight: 500;
 text-transform: uppercase;
}

.metaValue {
 font-size: 14px;
 color: #333;
 font-weight: 500;
}

/* Full-screen modal */
.fullScreenModal {
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background: rgba(0, 0, 0, 0.9);
 z-index: 1000;
 display: flex;
 flex-direction: column;
}

.modalHeader {
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 16px 24px;
 background: white;
 border-bottom: 1px solid #e0e0e0;
}

.modalHeader h2 {
 margin: 0;
 font-size: 18px;
}

.closeButton {
 background: none;
 border: none;
 font-size: 24px;
 cursor: pointer;
 padding: 0;
 width: 32px;
 height: 32px;
 display: flex;
 align-items: center;
 justify-content: center;
}

.closeButton:hover {
 background: #f0f0f0;
 border-radius: 4px;
}

.modalContent {
 flex: 1;
 overflow: hidden;
}

@media (max-width: 768px) {
 .sidebar {
 position: static;
 max-width: 100%;
 }

 .fullScreenModal {
 position: fixed;
 }
}
```

**Expected behavior:**
- ✅ PDF preview displays in sidebar
- ✅ "View Full Document" opens modal
- ✅ Page controls functional
- ✅ Download button works
- ✅ Mobile responsive

---

## Part 5: Test Case 4 - Inline Presentation + Lightbox 

### Step 5.1: Analyze project-detail-architecture-carousel.tsx

**Current behavior:**
- Displays architecture project images in carousel
- No video/PDF integration
- No interactivity (click doesn't open lightbox)

**Target behavior:**
- Multiple layout modes:
 - **Inline presentation:** Shows slide images horizontally
 - **Lightbox carousel:** Click any image opens full lightbox
 - **Video integration:** Click video thumbnail opens in lightbox
 - **PDF access:** Download/view PDF presentation
- All assets in single block

### Step 5.2: Create ArchitectureCarousel Component

```typescript
// components/blocks/project-detail/project-detail-architecture-carousel.tsx
import { useState } from 'react';
import {
 Lightbox,
 useLightbox,
 type LightboxItem,
} from '@page-speed/lightbox';
import { PDFViewer } from '@page-speed/pdf-viewer';
import { architectureShowcase } from '@/lib/mediaPlaceholders';
import styles from './project-detail-architecture-carousel.module.css';

interface ArchitectureCarouselProps {
 title?: string;
 description?: string;
 showInlinePresentation?: boolean;
 showVideoSection?: boolean;
 showPdfViewer?: boolean;
 showImageGallery?: boolean;
}

export function ProjectDetailArchitectureCarousel({
 title = 'Architecture Presentation',
 description = 'Complete visual presentation of the architectural design',
 showInlinePresentation = true,
 showVideoSection = true,
 showPdfViewer = true,
 showImageGallery = true,
}: ArchitectureCarouselProps) {
 const lightbox = useLightbox();
 const [selectedTab, setSelectedTab] = useState<
 'slides' | 'video' | 'pdf'
 >('slides');
 const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

 // Create LightboxItem array from presentation slides
 const slideItems: LightboxItem[] =
 architectureShowcase.presentationSlideImages.map((src, index) => ({
 id: `slide-${index}`,
 type: 'image' as const,
 src,
 alt: `Presentation Slide ${index + 1}`,
 title: `Slide ${index + 1}`,
 download: true,
 share: true,
 }));

 // Video item
 const videoItem: LightboxItem = {
 id: 'presentation-video',
 type: 'video' as const,
 src: architectureShowcase.presentationVideoSrc,
 title: 'Presentation Video',
 caption: 'Complete presentation walkthrough',
 };

 // PDF item
 const pdfItem: LightboxItem = {
 id: 'presentation-pdf',
 type: 'pdf' as const,
 src: architectureShowcase.presentationPdfSrc,
 title: 'Brand Guidelines PDF',
 caption: 'Complete brand presentation document',
 };

 const handleSlideClick = (index: number) => {
 lightbox.goTo(index);
 lightbox.open();
 };

 const handleVideoClick = () => {
 // Create a temporary array with just the video
 lightbox.items = [videoItem];
 lightbox.goTo(0);
 lightbox.open();
 };

 const handlePdfClick = () => {
 // Create a temporary array with just the PDF
 lightbox.items = [pdfItem];
 lightbox.goTo(0);
 lightbox.open();
 };

 return (
 <section className={styles.section}>
 <div className={styles.header}>
 {title && <h2 className={styles.title}>{title}</h2>}
 {description && (
 <p className={styles.description}>{description}</p>
 )}
 </div>

 {/* Tab Navigation */}
 <div className={styles.tabNav}>
 {showInlinePresentation && (
 <button
 className={`${styles.tab} ${
 selectedTab === 'slides' ? styles.active : ''
 }`}
 onClick={() => setSelectedTab('slides')}
 >
 Presentation Slides ({slideItems.length})
 </button>
 )}
 {showVideoSection && (
 <button
 className={`${styles.tab} ${
 selectedTab === 'video' ? styles.active : ''
 }`}
 onClick={() => setSelectedTab('video')}
 >
 Video
 </button>
 )}
 {showPdfViewer && (
 <button
 className={`${styles.tab} ${
 selectedTab === 'pdf' ? styles.active : ''
 }`}
 onClick={() => setSelectedTab('pdf')}
 >
 PDF Document
 </button>
 )}
 </div>

 {/* Content Sections */}
 <div className={styles.contentArea}>
 {/* Slides Section */}
 {showInlinePresentation && selectedTab === 'slides' && (
 <div className={styles.slidesSection}>
 {/* Inline Presentation View */}
 <div className={styles.inlinePresentation}>
 <div className={styles.mainSlide}>
 <img
 src={
 architectureShowcase.presentationSlideImages[
 currentSlideIndex
 ]
 }
 alt={`Slide ${currentSlideIndex + 1}`}
 className={styles.slideImage}
 />
 </div>

 {/* Slide Counter & Controls */}
 <div className={styles.slideControls}>
 <button
 className={styles.navButton}
 onClick={() =>
 setCurrentSlideIndex(
 Math.max(0, currentSlideIndex - 1)
 )
 }
 disabled={currentSlideIndex === 0}
 >
 ← Previous
 </button>

 <span className={styles.slideCounter}>
 {currentSlideIndex + 1} / {slideItems.length}
 </span>

 <button
 className={styles.navButton}
 onClick={() =>
 setCurrentSlideIndex(
 Math.min(
 slideItems.length - 1,
 currentSlideIndex + 1
 )
 )
 }
 disabled={currentSlideIndex === slideItems.length - 1}
 >
 Next →
 </button>

 <button
 className={styles.fullscreenButton}
 onClick={() => handleSlideClick(currentSlideIndex)}
 >
 Fullscreen
 </button>
 </div>
 </div>

 {/* Thumbnail Strip */}
 <div className={styles.thumbnailStrip}>
 {slideItems.map((item, index) => (
 <div
 key={item.id}
 className={`${styles.thumbnail} ${
 index === currentSlideIndex ? styles.active : ''
 }`}
 onClick={() => setCurrentSlideIndex(index)}
 >
 <img
 src={
 architectureShowcase.presentationSlideImages[index]
 }
 alt={`Slide ${index + 1}`}
 />
 <span className={styles.slideNum}>{index + 1}</span>
 </div>
 ))}
 </div>

 {/* Gallery Grid (Optional Full Gallery View) */}
 {showImageGallery && (
 <div className={styles.galleryGrid}>
 <h3>All Slides Gallery</h3>
 <div className={styles.grid}>
 {slideItems.map((item, index) => (
 <div
 key={item.id}
 className={styles.gridItem}
 onClick={() => handleSlideClick(index)}
 >
 <img
 src={item.src}
 alt={item.alt}
 className={styles.gridImage}
 />
 <div className={styles.gridOverlay}>
 <span className={styles.gridLabel}>
 View in Lightbox
 </span>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}
 </div>
 )}

 {/* Video Section */}
 {showVideoSection && selectedTab === 'video' && (
 <div className={styles.videoSection}>
 <div className={styles.videoContainer}>
 <video
 src={architectureShowcase.presentationVideoSrc}
 controls
 className={styles.video}
 controlsList="nodownload"
 />
 </div>
 <button
 className={styles.buttonFullscreen}
 onClick={handleVideoClick}
 >
 Open in Lightbox (Fullscreen)
 </button>
 </div>
 )}

 {/* PDF Section */}
 {showPdfViewer && selectedTab === 'pdf' && (
 <div className={styles.pdfSection}>
 <PDFViewer
 url={architectureShowcase.presentationPdfSrc}
 title="Brand Guidelines"
 height="600px"
 config={{
 showControls: true,
 showThumbnails: true,
 enableDownload: true,
 enablePrint: true,
 enableFullscreen: true,
 initialZoom: 'page-fit',
 }}
 />
 </div>
 )}
 </div>

 {/* Lightbox for Slides */}
 {lightbox.isOpen && selectedTab === 'slides' && (
 <Lightbox
 items={slideItems}
 initialIndex={lightbox.currentIndex}
 layout="custom-slide"
 controls={{
 navigation: true,
 thumbnails: true,
 counter: true,
 fullscreen: true,
 download: true,
 share: true,
 captions: true,
 }}
 onClose={lightbox.close}
 onSelect={(index) => setCurrentSlideIndex(index)}
 enableKeyboardShortcuts={true}
 />
 )}

 {/* Lightbox for Video */}
 {lightbox.isOpen && selectedTab === 'video' && (
 <Lightbox
 items={[videoItem]}
 initialIndex={0}
 layout="fullscreen"
 controls={{
 navigation: false,
 fullscreen: true,
 share: true,
 }}
 onClose={lightbox.close}
 enableKeyboardShortcuts={true}
 />
 )}

 {/* Lightbox for PDF */}
 {lightbox.isOpen && selectedTab === 'pdf' && (
 <Lightbox
 items={[pdfItem]}
 initialIndex={0}
 layout="fullscreen"
 controls={{
 navigation: false,
 fullscreen: true,
 }}
 onClose={lightbox.close}
 enableKeyboardShortcuts={true}
 />
 )}
 </section>
 );
}
```

### Step 5.3: Comprehensive CSS

```css
/* components/blocks/project-detail/project-detail-architecture-carousel.module.css */

.section {
 width: 100%;
 padding: 48px 0;
}

.header {
 text-align: center;
 margin-bottom: 40px;
}

.title {
 margin: 0 0 12px 0;
 font-size: 32px;
 font-weight: 700;
}

.description {
 margin: 0;
 color: #666;
 font-size: 18px;
 line-height: 1.6;
 max-width: 600px;
 margin-left: auto;
 margin-right: auto;
}

/* Tab Navigation */
.tabNav {
 display: flex;
 gap: 16px;
 justify-content: center;
 margin-bottom: 32px;
 border-bottom: 2px solid #f0f0f0;
}

.tab {
 padding: 12px 24px;
 background: none;
 border: none;
 font-size: 16px;
 font-weight: 600;
 color: #999;
 cursor: pointer;
 transition: all 200ms ease;
 position: relative;
}

.tab:hover {
 color: #333;
}

.tab.active {
 color: #007bff;
}

.tab.active::after {
 content: '';
 position: absolute;
 bottom: -2px;
 left: 0;
 right: 0;
 height: 2px;
 background: #007bff;
}

.contentArea {
 min-height: 600px;
}

/* Slides Section */
.slidesSection {
 display: flex;
 flex-direction: column;
 gap: 24px;
}

.inlinePresentation {
 display: flex;
 flex-direction: column;
 gap: 16px;
 background: white;
 border: 1px solid #e0e0e0;
 border-radius: 12px;
 padding: 24px;
}

.mainSlide {
 aspect-ratio: 16 / 10;
 overflow: hidden;
 border-radius: 8px;
 background: #f5f5f5;
}

.slideImage {
 width: 100%;
 height: 100%;
 object-fit: contain;
 display: block;
}

.slideControls {
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 16px;
}

.navButton,
.fullscreenButton {
 padding: 10px 16px;
 background: #f0f0f0;
 border: 1px solid #ddd;
 border-radius: 6px;
 font-size: 14px;
 font-weight: 600;
 cursor: pointer;
 transition: all 150ms ease;
}

.navButton:hover:not(:disabled),
.fullscreenButton:hover {
 background: #007bff;
 color: white;
 border-color: #007bff;
}

.navButton:disabled {
 opacity: 0.5;
 cursor: not-allowed;
}

.slideCounter {
 font-size: 14px;
 font-weight: 600;
 color: #666;
 min-width: 80px;
 text-align: center;
}

.fullscreenButton {
 background: #007bff;
 color: white;
 border-color: #007bff;
 margin-left: auto;
}

/* Thumbnail Strip */
.thumbnailStrip {
 display: flex;
 gap: 12px;
 overflow-x: auto;
 padding: 8px 0;
}

.thumbnail {
 position: relative;
 width: 80px;
 height: 60px;
 border: 2px solid transparent;
 border-radius: 6px;
 cursor: pointer;
 overflow: hidden;
 flex-shrink: 0;
 transition: all 150ms ease;
}

.thumbnail:hover {
 border-color: #ddd;
 transform: scale(1.05);
}

.thumbnail.active {
 border-color: #007bff;
 box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}

.thumbnail img {
 width: 100%;
 height: 100%;
 object-fit: cover;
}

.slideNum {
 position: absolute;
 bottom: 4px;
 right: 4px;
 background: rgba(0, 0, 0, 0.7);
 color: white;
 font-size: 11px;
 padding: 2px 6px;
 border-radius: 3px;
}

/* Gallery Grid */
.galleryGrid {
 margin-top: 40px;
}

.galleryGrid h3 {
 margin: 0 0 20px 0;
 font-size: 20px;
 font-weight: 600;
}

.grid {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
 gap: 16px;
}

.gridItem {
 position: relative;
 aspect-ratio: 4 / 3;
 border-radius: 8px;
 overflow: hidden;
 cursor: pointer;
 group: '';
}

.gridImage {
 width: 100%;
 height: 100%;
 object-fit: cover;
 transition: transform 300ms ease;
}

.gridItem:hover .gridImage {
 transform: scale(1.05);
}

.gridOverlay {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background: rgba(0, 123, 255, 0.9);
 display: flex;
 align-items: center;
 justify-content: center;
 opacity: 0;
 transition: opacity 200ms ease;
}

.gridItem:hover .gridOverlay {
 opacity: 1;
}

.gridLabel {
 color: white;
 font-weight: 600;
 font-size: 14px;
}

/* Video Section */
.videoSection {
 display: flex;
 flex-direction: column;
 gap: 16px;
}

.videoContainer {
 aspect-ratio: 16 / 9;
 border-radius: 12px;
 overflow: hidden;
 background: #000;
}

.video {
 width: 100%;
 height: 100%;
}

.buttonFullscreen {
 padding: 12px 24px;
 background: #007bff;
 color: white;
 border: none;
 border-radius: 8px;
 font-size: 16px;
 font-weight: 600;
 cursor: pointer;
 transition: background 200ms ease;
}

.buttonFullscreen:hover {
 background: #0056b3;
}

/* PDF Section */
.pdfSection {
 border: 1px solid #e0e0e0;
 border-radius: 12px;
 overflow: hidden;
}

/* Responsive */
@media (max-width: 768px) {
 .section {
 padding: 32px 0;
 }

 .title {
 font-size: 24px;
 }

 .description {
 font-size: 16px;
 }

 .tabNav {
 flex-wrap: wrap;
 gap: 8px;
 }

 .tab {
 padding: 8px 16px;
 font-size: 14px;
 }

 .slideControls {
 flex-wrap: wrap;
 gap: 8px;
 }

 .fullscreenButton {
 margin-left: 0;
 width: 100%;
 }

 .grid {
 grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
 gap: 12px;
 }
}
```

### Step 5.4: Usage Example

```typescript
// Example in your page
import { ProjectDetailArchitectureCarousel } from '@/components/blocks/project-detail/project-detail-architecture-carousel';

export function ArchitecturePortfolioPage() {
 return (
 <main>
 <ProjectDetailArchitectureCarousel
 title="Brand Identity System"
 description="Complete visual presentation of the architectural design with slides, video, and documentation"
 showInlinePresentation={true}
 showVideoSection={true}
 showPdfViewer={true}
 showImageGallery={true}
 />
 </main>
 );
}
```

**Expected behavior:**
- ✅ Inline presentation with slide controls
- ✅ Click slides → opens lightbox carousel
- ✅ Video plays inline + opens in lightbox
- ✅ PDF viewer embedded + downloadable
- ✅ All tabs switch seamlessly
- ✅ Mobile responsive
- ✅ Keyboard navigation in lightbox

---

## Part 6: Verification & Testing 

### Step 6.1: Integration Checklist

- [ ] Both packages installed and resolving correctly
- [ ] No TypeScript errors in build
- [ ] All imports working in test components

### Step 6.2: Test Case 1: Image Carousel

- [ ] Click image opens lightbox
- [ ] Navigate with arrows
- [ ] Navigate with keyboard
- [ ] Thumbnails visible and clickable
- [ ] Download button works
- [ ] Share button works
- [ ] Fullscreen works
- [ ] Escape key closes
- [ ] Mobile responsive

### Step 6.3: Test Case 2: Video Gallery

- [ ] Video cards display correctly
- [ ] Click opens in lightbox
- [ ] Play button visible on hover
- [ ] Video controls work in lightbox
- [ ] Multiple videos can be navigated
- [ ] Fullscreen playback works
- [ ] Mobile responsive

### Step 6.4: Test Case 3: PDF Viewer

- [ ] PDF loads in sidebar preview
- [ ] "View Full Document" opens modal
- [ ] Page controls work
- [ ] Zoom in/out works
- [ ] Download button works
- [ ] Print button works
- [ ] Close modal works
- [ ] Mobile responsive

### Step 6.5: Test Case 4: Architecture Carousel

- [ ] Tabs switch correctly
- [ ] Slides inline viewer works
- [ ] Slide navigation works
- [ ] Click slides opens lightbox
- [ ] Video plays inline
- [ ] Video opens in lightbox fullscreen
- [ ] PDF viewer embedded
- [ ] PDF controls work
- [ ] Gallery grid displays
- [ ] Click gallery opens lightbox
- [ ] All keyboard shortcuts work

### Step 6.6: Performance Testing

```bash
# Run bundle analysis
npm run bundle-analyze

# Expected sizes:
# - @page-speed/pdf-viewer: <30 KB gzipped
# - @page-speed/lightbox: <25 KB gzipped
# - Total impact on opensite-ui: <60 KB
```

### Step 6.7: Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Alt text present
- [ ] ARIA labels correct
- [ ] Color contrast sufficient
- [ ] Mobile tap targets ≥44px

---

## Part 7: Documentation & Deployment

### Step 7.1: Add Component Documentation

```typescript
// components/blocks/gallery/masonry-motion-grid.tsx

/**
 * MasonryMotionGrid with Lightbox Integration
 *
 * Displays images in a responsive masonry layout with motion effects.
 * Clicking any image opens an interactive lightbox carousel.
 *
 * @component
 * @example
 * const images = [
 * { id: '1', src: '/img1.jpg', alt: 'Image 1' },
 * { id: '2', src: '/img2.jpg', alt: 'Image 2' },
 * ];
 * return <MasonryMotionGrid images={images} columns={3} />;
 *
 * @param {Array} images - Image objects with id, src, alt, caption
 * @param {number} [columns=3] - Number of grid columns
 * @returns {React.ReactElement} Masonry grid with lightbox
 */
```

### Step 7.2: Create Integration Docs

```markdown
# Lightbox & PDF Viewer Integration Guide

## Available Components

### Lightbox
- **Package:** @page-speed/pdf-viewer
- **Main Component:** `<Lightbox />`
- **Hook:** `useLightbox()`
- **Layouts:** horizontal, vertical-split, custom-slide, fullscreen, inline
- **Content Types:** image, video, PDF, custom components
- **Bundle Size:** <25 KB gzipped

### PDF Viewer
- **Package:** @page-speed/pdf-viewer
- **Main Component:** `<PDFViewer />`
- **Hook:** `usePDFDocument()`
- **Features:** Page controls, zoom, search, thumbnails, print, download
- **Bundle Size:** <30 KB gzipped

## Quick Start

See test case implementations in:
- Lightbox: `components/blocks/gallery/masonry-motion-grid.tsx`
- Video: `components/blocks/link-page/video-gallery.tsx`
- PDF: `components/blocks/resource-detail/resource-detail-whitepaper-sidebar.tsx`
- Combined: `components/blocks/project-detail/project-detail-architecture-carousel.tsx`
```

### Step 7.3: Update package.json

```json
{
 "dependencies": {
 "@page-speed/lightbox": "^1.0.0",
 "@page-speed/pdf-viewer": "^1.0.0"
 },
 "devDependencies": {
 // ... existing
 }
}
```

---

## Summary

### Implementation Checklist

**Pre-Integration (30 minutes)**
- [ ] Install both packages
- [ ] Add architecture showcase to mediaPlaceholders.ts
- [ ] Create useLightboxGlobal hook (optional)
- [ ] Verify imports resolve

**Test Case 1: Image Carousel (4-6 hours)**
- [ ] Modify masonry-motion-grid.tsx
- [ ] Add click handlers
- [ ] Add CSS hover states
- [ ] Test all interactions
- [ ] Test mobile

**Test Case 2: Video Gallery (4-6 hours)**
- [ ] Create VideoGallery component
- [ ] Update link-tree-block.tsx
- [ ] Add video controls
- [ ] Test video playback
- [ ] Test mobile

**Test Case 3: PDF Viewer (3-4 hours)**
- [ ] Modify whitepaper sidebar
- [ ] Add PDF preview
- [ ] Add full-screen modal
- [ ] Test PDF controls
- [ ] Test mobile

**Test Case 4: Architecture Carousel (6-8 hours)**
- [ ] Create comprehensive carousel
- [ ] Implement all tabs
- [ ] Add slide controls
- [ ] Integrate all media types
- [ ] Add lightbox integration
- [ ] Test all features

**Verification & Testing (2-3 hours)**
- [ ] Run all test cases
- [ ] Performance testing
- [ ] Accessibility audit
- [ ] Mobile responsive check

**Total Time: 20-30 hours (3-4 days)**

### Next Steps

1. **Immediate:** Install packages, add mediaPlaceholders
2. **Step 1:** Implement Test Case 1 (Image Carousel)
3. **Step 2:** Implement Test Case 2 (Video Gallery)
4. **Step 3:** Implement Test Cases 3 & 4 (PDF + Architecture)
5. **Step 4:** Full QA testing & deployment

### Key Success Factors

✅ Both packages are fully built and tested
✅ APIs are stable and well-documented
✅ Integration points are clear and focused
✅ Test cases cover all major features
✅ Performance budgets are achievable
✅ Accessibility built-in

### Questions to Address Before Starting

1. Should we create a global lightbox provider or use hooks per component?
2. Do we need custom styling theme for lightbox/PDF?
3. Should lightbox be available globally or scoped to components?
4. Do we need analytics tracking for interactions?
5. Should we add animations/transitions to lightbox?

---

**Ready to begin implementation! 🚀**