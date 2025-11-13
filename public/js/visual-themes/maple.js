(function(global) {
    'use strict';

    if (!global.OceanOfMaya) {
        global.OceanOfMaya = {};
    }
    if (!global.OceanOfMaya.VisualThemes) {
        global.OceanOfMaya.VisualThemes = {};
    }

    const Maple = function() {
        if (!global.OceanOfMaya.VisualThemes.BaseTheme) {
            console.error('BaseTheme must be loaded before Maple');
            return;
        }
        global.OceanOfMaya.VisualThemes.BaseTheme.call(this);
        
        this.createShapeSet = function(birthCount) {
            const container = document.body;
            const Constants = global.OceanOfMaya.Constants || {};
            const leafSizeMin = Constants.MAPLE_LEAF_SIZE_MIN || 25;
            const leafSizeMax = Constants.MAPLE_LEAF_SIZE_MAX || 70;
            const leafSize = leafSizeMin + Math.random() * (leafSizeMax - leafSizeMin);

            const leaf = document.createElement('div');
            leaf.className = 'maple-leaf';
            // Maple leaves are naturally wider than tall (~1.2:1 ratio)
            const leafWidth = leafSize * 1.20;
            const leafHeight = leafSize * 1.00;
            leaf.style.width = leafWidth + 'px';
            leaf.style.height = leafHeight + 'px';
            leaf.style.position = 'absolute';
            const baseBoundaryPadding = Constants.VISUAL_ELEMENT_BOUNDARY_PADDING || 20;
            const themePaddingMap = Constants.VISUAL_ELEMENT_BOUNDARY_PADDING_BY_THEME || {};
            const themeExtraPadding = themePaddingMap['maple'] || 0;
            const boundaryPadding = baseBoundaryPadding + themeExtraPadding;
            const adjustedWidth = Math.max(0, window.innerWidth - boundaryPadding * 2);
            const adjustedHeight = Math.max(0, window.innerHeight - boundaryPadding * 2);
            leaf.style.left = (boundaryPadding + Math.random() * Math.max(0, adjustedWidth - leafWidth)) + 'px';
            leaf.style.top = (boundaryPadding + Math.random() * Math.max(0, adjustedHeight - leafHeight)) + 'px';
            leaf.style.filter = 'none';
            leaf.style.opacity = '1';
            leaf.style.transition = 'transform 0.5s';

            const svgNS = 'http://www.w3.org/2000/svg';
            const svg = document.createElementNS(svgNS, 'svg');
            svg.setAttribute('class', 'maple-svg');
            // 1000x1000 viewBox provides high resolution for crisp rendering at any size
            svg.setAttribute('viewBox', '0 0 1000 1000');
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            svg.style.overflow = 'visible';

            const defs = document.createElementNS(svgNS, 'defs');
            
            // Radial gradient centered at 35% height creates natural light distribution
            // (lighter at top-center, darker at edges) for realistic depth
            const grad = document.createElementNS(svgNS, 'radialGradient');
            grad.setAttribute('id', 'mapleGrad-' + Math.random().toString(36).slice(2));
            grad.setAttribute('cx', '50%');
            grad.setAttribute('cy', '35%');
            grad.setAttribute('r', '65%');
            const stop1 = document.createElementNS(svgNS, 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('style', 'stop-color: var(--maple-color1, #DC143C); stop-opacity: 1');
            const stop2 = document.createElementNS(svgNS, 'stop');
            stop2.setAttribute('offset', '50%');
            stop2.setAttribute('style', 'stop-color: var(--maple-color2, #8B4513); stop-opacity: 0.95');
            const stop3 = document.createElementNS(svgNS, 'stop');
            stop3.setAttribute('offset', '100%');
            stop3.setAttribute('style', 'stop-color: var(--maple-color2, #8B4513); stop-opacity: 0.88');
            grad.appendChild(stop1);
            grad.appendChild(stop2);
            grad.appendChild(stop3);
            defs.appendChild(grad);
            
            // Texture overlay gradient adds subtle depth variation using mix-blend-mode
            const texGrad = document.createElementNS(svgNS, 'radialGradient');
            texGrad.setAttribute('id', 'mapleTexture-' + Math.random().toString(36).slice(2));
            texGrad.setAttribute('cx', '30%');
            texGrad.setAttribute('cy', '30%');
            texGrad.setAttribute('r', '80%');
            const texStop1 = document.createElementNS(svgNS, 'stop');
            texStop1.setAttribute('offset', '0%');
            texStop1.setAttribute('style', 'stop-color: rgba(255,255,255,0.3)');
            const texStop2 = document.createElementNS(svgNS, 'stop');
            texStop2.setAttribute('offset', '100%');
            texStop2.setAttribute('style', 'stop-color: rgba(0,0,0,0.1)');
            texGrad.appendChild(texStop1);
            texGrad.appendChild(texStop2);
            defs.appendChild(texGrad);
            
            svg.appendChild(defs);

            // 5-lobed maple leaf silhouette path (classic maple leaf shape)
            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('class', 'leaf-path');
            path.setAttribute('fill', `url(#${grad.getAttribute('id')})`);
            path.setAttribute('stroke', 'rgba(100,50,20,0.7)');
            path.setAttribute('stroke-width', '10');
            path.setAttribute('stroke-linejoin', 'round');
            path.setAttribute('d', [
                'M 500 100',
                'C 540 140, 580 175, 630 215',
                'C 690 265, 750 325, 810 395',
                'C 860 455, 900 510, 920 560',
                'C 880 555, 830 545, 780 535',
                'C 740 528, 700 525, 660 525',
                'C 680 565, 710 610, 730 660',
                'C 740 700, 735 740, 715 775',
                'C 685 760, 650 740, 615 720',
                'C 585 705, 560 695, 535 690',
                'C 525 730, 518 780, 510 840',
                'C 505 860, 502 880, 500 900',
                'C 498 880, 495 860, 490 840',
                'C 482 780, 475 730, 465 690',
                'C 440 695, 415 705, 385 720',
                'C 350 740, 315 760, 285 775',
                'C 265 740, 260 700, 270 660',
                'C 290 610, 320 565, 340 525',
                'C 300 525, 260 528, 220 535',
                'C 170 545, 120 555, 80 560',
                'C 100 510, 140 455, 190 395',
                'C 250 325, 310 265, 370 215',
                'C 420 175, 460 140, 500 100',
                'Z'
            ].join(' '));
            
            // Texture overlay uses same path with blend mode for natural surface variation
            const texturePath = document.createElementNS(svgNS, 'path');
            texturePath.setAttribute('class', 'leaf-texture');
            texturePath.setAttribute('d', path.getAttribute('d'));
            texturePath.setAttribute('fill', `url(#${texGrad.getAttribute('id')})`);
            texturePath.setAttribute('opacity', '0.4');

            // Vein structure: primary midrib + major veins to each lobe + secondary branches
            const veins = document.createElementNS(svgNS, 'g');
            veins.setAttribute('class', 'leaf-veins');
            const vein = (x1,y1,x2,y2,width) => {
                const v = document.createElementNS(svgNS, 'line');
                v.setAttribute('x1', String(x1));
                v.setAttribute('y1', String(y1));
                v.setAttribute('x2', String(x2));
                v.setAttribute('y2', String(y2));
                v.setAttribute('stroke-width', String(width || 8));
                v.setAttribute('vector-effect', 'non-scaling-stroke');
                return v;
            };
            veins.appendChild(vein(500, 900, 500, 100, 12)); // Primary midrib
            veins.appendChild(vein(500, 400, 820, 520, 10)); // Right upper lobe
            veins.appendChild(vein(500, 400, 180, 520, 10)); // Left upper lobe
            veins.appendChild(vein(500, 650, 720, 720, 9));  // Right mid lobe
            veins.appendChild(vein(500, 650, 280, 720, 9));  // Left mid lobe
            veins.appendChild(vein(650, 460, 850, 480, 6)); // Right upper branch
            veins.appendChild(vein(350, 460, 150, 480, 6)); // Left upper branch
            veins.appendChild(vein(600, 680, 700, 740, 6)); // Right mid branch
            veins.appendChild(vein(400, 680, 300, 740, 6));  // Left mid branch

            svg.appendChild(path);
            svg.appendChild(texturePath);
            svg.appendChild(veins);
            leaf.appendChild(svg);
            // Remove container styling so SVG defines all visual appearance
            leaf.style.background = 'none';
            leaf.style.clipPath = 'none';
            leaf.style.webkitClipPath = 'none';
            leaf.style.zIndex = '2000';
            // Start in grayscale - theme lifecycle will remove filter when leaf ages
            leaf.style.filter = 'grayscale(1)';
            leaf.style.opacity = '0.5';
            
            container.appendChild(leaf);

            const mapleVelocityMultiplier = Constants.MAPLE_VELOCITY_MULTIPLIER || 0.7;
            const baseVelocityY = (Math.random() * 0.4 + 0.1) * mapleVelocityMultiplier;
            const baseVelocityX = (Math.random() - 0.5) * mapleVelocityMultiplier * 0.8;
            // Fast rotation (0.4-1.6 deg/frame) creates magical swirling motion
            const baseRotationSpeed = 0.4 + Math.random() * 1.2;
            const rotationDirection = Math.random() < 0.5 ? -1 : 1;
            const initialRotation = Math.random() * 360;
            
            const shapeSet = {
                primaryElement: leaf,
                secondaryElements: [],
                velocityX: baseVelocityX,
                velocityY: baseVelocityY,
                angle: initialRotation,
                secondaryRadius: 0,
                size: leafSize,
                birthCount: birthCount || 0,
                leafSize: leafSize,
                isMaple: true, // Flag for base-theme.js physics system
                rotationSpeed: baseRotationSpeed * rotationDirection,
                // Acceleration variation creates dynamic tumbling motion
                rotationAcceleration: (Math.random() - 0.5) * 0.008,
                flutterTimer: Math.random() * 100, // Random start for varied flutter timing
                flutterIntensity: 0.4 + Math.random() * 0.4 // 0.4-0.8 for stronger variation
            };

            requestAnimationFrame(() => {
                leaf.style.transform = `rotate(${initialRotation}deg)`;
            });

            return shapeSet;
        };
    };
    
    Maple.prototype = Object.create(global.OceanOfMaya.VisualThemes.BaseTheme.prototype);
    Maple.prototype.constructor = Maple;

    global.OceanOfMaya.VisualThemes.Maple = Maple;

})(typeof window !== 'undefined' ? window : this);

