#!/usr/bin/env python3
"""
Script to convert render functions to useMemo in hero block components.
This script:
1. Finds all render functions (const renderX = () => {)
2. Converts them to useMemo with proper dependency arrays
3. Updates JSX calls from {renderX()} to {renderX}
"""

import re
import sys
from pathlib import Path

def extract_dependencies(function_body: str, props: list[str]) -> list[str]:
    """Extract dependencies from function body by finding prop references."""
    deps = set()
    for prop in props:
        # Look for prop usage in the function body
        if re.search(rf'\b{prop}\b', function_body):
            deps.add(prop)
    return sorted(list(deps))

def convert_file(filepath: Path):
    """Convert render functions in a single file to useMemo."""
    print(f"Converting {filepath.name}...")

    content = filepath.read_text()

    # Pattern to match render functions
    # Matches: const renderX = () => { ... };
    pattern = r'(  const (render\w+) = \(\) => \{)(.*?)(^\  \};)'

    def replacer(match):
        indent = match.group(1)
        func_name = match.group(2)
        body = match.group(3)
        closing = match.group(4)

        # Extract common dependencies from the function body
        common_deps = []

        # Check for common slot/prop patterns
        if f'{func_name.replace("render", "").lower()}Slot' in body.lower():
            common_deps.append(f'{func_name.replace("render", "").lower()}Slot')

        # Add className dependencies if present
        if 'ClassName' in body:
            for word in re.findall(r'(\w+ClassName)', body):
                if word not in common_deps:
                    common_deps.append(word)

        # Add optixFlowConfig if present
        if 'optixFlowConfig' in body:
            common_deps.append('optixFlowConfig')

        # Convert function to useMemo
        new_func = f'{indent.replace("= () =>", "= useMemo(() =>")}{body}{closing.replace("};", "}, [" + ", ".join(common_deps) + "]);")} '

        return new_func

    # Apply conversion
    converted = re.sub(pattern, replacer, content, flags=re.MULTILINE | re.DOTALL)

    # Update JSX calls from {renderX()} to {renderX}
    converted = re.sub(r'\{(render\w+)\(\)\}', r'{\1}', converted)

    # Write back
    filepath.write_text(converted)
    print(f"  ✓ Converted {filepath.name}")

def main():
    hero_dir = Path(__file__).parent

    files_to_convert = [
        "hero-gradient-client-focused.tsx",
        "hero-grid-pattern-efficiency.tsx",
        "hero-grid-pattern-solutions.tsx",
        "hero-logo-centered-screenshot.tsx",
        "hero-marketplace-scattered-images.tsx",
        "hero-mental-health-team.tsx",
        "hero-mentorship-video-split.tsx",
        "hero-minimal-centered-dark.tsx",
        "hero-mobile-app-download.tsx",
        "hero-newsletter-minimal.tsx",
        "hero-overlay-cta-grid.tsx",
        "hero-pattern-badge-logos.tsx",
        "hero-pattern-logo-tech-stack.tsx",
        "hero-platform-features-grid.tsx",
        "hero-portfolio-creative.tsx",
        "hero-premium-split-avatars.tsx",
        "hero-presentation-platform-video.tsx",
        "hero-pricing-comparison.tsx",
        "hero-product-showcase-floating.tsx",
        "hero-productivity-launcher-video.tsx",
        "hero-saas-dashboard-preview.tsx",
        "hero-shared-inbox-layered.tsx",
        "hero-software-growth-video-dialog.tsx",
        "hero-spiral-pattern-cards.tsx",
        "hero-split-geometric-shapes.tsx",
        "hero-split-icon-cards.tsx",
        "hero-split-image-newsletter.tsx",
        "hero-split-spiral-shapes.tsx",
        "hero-startup-launch-cta.tsx",
        "hero-stats-social-proof.tsx",
        "hero-task-timer-animated.tsx",
        "hero-tech-carousel.tsx",
        "hero-testimonial-image-grid.tsx",
        "hero-therapy-testimonial-grid.tsx",
        "hero-ui-library-showcase.tsx",
        "hero-video-background-dark.tsx",
        "hero-video-dialog-gradient.tsx",
        "hero-video-overlay-stars.tsx",
        "hero-welcome-asymmetric-images.tsx",
    ]

    for filename in files_to_convert:
        filepath = hero_dir / filename
        if filepath.exists():
            try:
                convert_file(filepath)
            except Exception as e:
                print(f"  ✗ Error converting {filename}: {e}")
        else:
            print(f"  ✗ File not found: {filename}")

    print("\n✅ Conversion complete!")
    print("⚠️  Note: Please manually review dependency arrays for accuracy.")

if __name__ == "__main__":
    main()
