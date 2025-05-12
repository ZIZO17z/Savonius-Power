// Main JavaScript file with animations, interactivity, and engaging effects
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. PRELOADER ANIMATION
    // ======================
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="wind-turbine-animation">
            <div class="tower"></div>
            <div class="blades"></div>
        </div>
        <p>Loading Savonius Power Project...</p>
    `;
    document.body.prepend(preloader);

    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        }, 1000);
    });

    // ======================
    // 2. SCROLL-BASED ANIMATIONS
    // ======================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.figure, h2, h3, p, table, ol, .references');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special animation for figures
                    if (entry.target.classList.contains('figure')) {
                        const img = entry.target.querySelector('img');
                        if (img) {
                            img.style.transform = 'scale(1)';
                            img.style.opacity = '1';
                        }
                        const caption = entry.target.querySelector('.figure-caption');
                        if (caption) {
                            caption.style.opacity = '1';
                            caption.style.transform = 'translateY(0)';
                        }
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        elements.forEach(el => observer.observe(el));
    };

    animateOnScroll();

    // ======================
    // 3. INTERACTIVE WIND TURBINE SIMULATION
    // ======================
    const createTurbineSimulation = function() {
        const turbineSim = document.createElement('div');
        turbineSim.className = 'turbine-simulation';
        turbineSim.innerHTML = `
            <div class="simulation-container">
                <div class="turbine-model">
                    <div class="tower"></div>
                    <div class="blades"></div>
                </div>
                <div class="controls">
                    <h3>Wind Turbine Simulator</h3>
                    <div class="slider-container">
                        <label for="windSpeed">Wind Speed (m/s): <span id="windValue">2.5</span></label>
                        <input type="range" id="windSpeed" min="0" max="10" step="0.1" value="2.5">
                    </div>
                    <div class="output-stats">
                        <div class="stat">
                            <span class="stat-label">Power Output:</span>
                            <span class="stat-value" id="powerOutput">0.35W</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Energy (5 min):</span>
                            <span class="stat-value" id="energyOutput">63.57J</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Efficiency:</span>
                            <span class="stat-value" id="efficiency">18%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.querySelector('.abstract').after(turbineSim);

        const windSpeedSlider = document.getElementById('windSpeed');
        const windValue = document.getElementById('windValue');
        const powerOutput = document.getElementById('powerOutput');
        const energyOutput = document.getElementById('energyOutput');
        const efficiency = document.getElementById('efficiency');
        const blades = document.querySelector('.turbine-model .blades');

        windSpeedSlider.addEventListener('input', function() {
            const speed = parseFloat(this.value);
            windValue.textContent = speed.toFixed(1);
            
            // Calculate outputs based on wind speed
            const power = (0.14 * Math.pow(speed, 3)).toFixed(2);
            const energy = (power * 300).toFixed(2); // 5 minutes = 300 seconds
            const eff = (15 + (speed * 0.6)).toFixed(0);
            
            powerOutput.textContent = power + 'W';
            energyOutput.textContent = energy + 'J';
            efficiency.textContent = eff + '%';
            
            // Animate blades
            const rotationSpeed = speed * 2;
            blades.style.animationDuration = `${3 - (speed / 5)}s`;
            
            // Color coding based on efficiency
            if (eff > 20) {
                efficiency.style.color = '#4CAF50';
            } else if (eff > 15) {
                efficiency.style.color = '#FFC107';
            } else {
                efficiency.style.color = '#F44336';
            }
        });
    };

    createTurbineSimulation();

    // ======================
    // 4. INTERACTIVE DATA VISUALIZATION
    // ======================
    const createEnergyChart = function() {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'energy-chart';
        chartContainer.innerHTML = `
            <h3>Energy Output Comparison</h3>
            <div class="chart">
                <div class="chart-bar fossil" style="height: 89%">
                    <span class="bar-label">Fossil Fuels: 89%</span>
                </div>
                <div class="chart-bar alternative" style="height: 11%">
                    <span class="bar-label">Alternative: 11%</span>
                </div>
                <div class="chart-bar our-solution" style="height: 18%">
                    <span class="bar-label">Our Solution: 18% efficiency</span>
                </div>
            </div>
            <div class="chart-legend">
                <div class="legend-item"><span class="legend-color fossil"></span> Fossil Fuels</div>
                <div class="legend-item"><span class="legend-color alternative"></span> Alternative Energy</div>
                <div class="legend-item"><span class="legend-color our-solution"></span> Our VAWT Solution</div>
            </div>
        `;
        
        document.querySelector('.figure[alt="Egypt\'s energy resources"]').after(chartContainer);

        // Animate bars on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.chart-bar');
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.transform = 'scaleY(1)';
                            bar.style.opacity = '1';
                        }, index * 200);
                    });
                }
            });
        }, {threshold: 0.5});

        observer.observe(chartContainer);
    };

    createEnergyChart();

    // ======================
    // 5. MATERIALS COMPARISON INTERACTIVE
    // ======================
    const createMaterialsComparison = function() {
        const materials = [
            { name: 'Galvanized Steel', strength: 500, weight: 7850, cost: 3, corrosion: 'Excellent' },
            { name: 'Aluminum', strength: 276, weight: 2700, cost: 5, corrosion: 'Good' },
            { name: 'Fiberglass', strength: 350, weight: 1800, cost: 8, corrosion: 'Excellent' }
        ];

        const comparisonSection = document.createElement('div');
        comparisonSection.className = 'materials-comparison';
        comparisonSection.innerHTML = `
            <h3>Materials Comparison</h3>
            <div class="comparison-container">
                <div class="material-selector">
                    ${materials.map((mat, i) => `
                        <button class="material-btn ${i === 0 ? 'active' : ''}" data-index="${i}">
                            ${mat.name}
                        </button>
                    `).join('')}
                </div>
                <div class="material-display">
                    <div class="material-properties">
                        <div class="property">
                            <span class="property-name">Yield Strength:</span>
                            <span class="property-value" id="strength">${materials[0].strength} MPa</span>
                        </div>
                        <div class="property">
                            <span class="property-name">Density:</span>
                            <span class="property-value" id="weight">${materials[0].weight} kg/m³</span>
                        </div>
                        <div class="property">
                            <span class="property-name">Cost:</span>
                            <span class="property-value" id="cost">${'$'.repeat(materials[0].cost)}</span>
                        </div>
                        <div class="property">
                            <span class="property-name">Corrosion Resistance:</span>
                            <span class="property-value" id="corrosion">${materials[0].corrosion}</span>
                        </div>
                    </div>
                    <div class="material-visual">
                        <div class="material-image" style="background-image: url('Picture15.png')"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.querySelector('.figure[alt="Fiber glass"]').after(comparisonSection);

        const buttons = document.querySelectorAll('.material-btn');
        const strengthEl = document.getElementById('strength');
        const weightEl = document.getElementById('weight');
        const costEl = document.getElementById('cost');
        const corrosionEl = document.getElementById('corrosion');
        const materialImage = document.querySelector('.material-image');

        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                buttons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const index = this.dataset.index;
                const mat = materials[index];
                
                // Animate property changes
                strengthEl.style.opacity = '0';
                weightEl.style.opacity = '0';
                costEl.style.opacity = '0';
                corrosionEl.style.opacity = '0';
                
                setTimeout(() => {
                    strengthEl.textContent = `${mat.strength} MPa`;
                    weightEl.textContent = `${mat.weight} kg/m³`;
                    costEl.textContent = '$'.repeat(mat.cost);
                    corrosionEl.textContent = mat.corrosion;
                    
                    strengthEl.style.opacity = '1';
                    weightEl.style.opacity = '1';
                    costEl.style.opacity = '1';
                    corrosionEl.style.opacity = '1';
                    
                    // Change image based on material
                    if (mat.name === 'Fiberglass') {
                        materialImage.style.backgroundImage = "url('Picture15.png')";
                    } else if (mat.name === 'Aluminum') {
                        materialImage.style.backgroundImage = "url('Picture3.jpg')";
                    } else {
                        materialImage.style.backgroundImage = "url('figure2.jpg.png')";
                    }
                }, 300);
            });
        });
    };

    createMaterialsComparison();

    // ======================
    // 6. INTERACTIVE FORMULAS
    // ======================
    const makeFormulasInteractive = function() {
        const formulas = document.querySelectorAll('p:has(sub)');
        
        formulas.forEach(formula => {
            formula.classList.add('interactive-formula');
            
            formula.addEventListener('click', function() {
                this.classList.toggle('expanded');
                
                if (this.classList.contains('expanded')) {
                    const explanation = document.createElement('div');
                    explanation.className = 'formula-explanation';
                    
                    if (formula.textContent.includes('A₁V₁ = A₂V₂')) {
                        explanation.innerHTML = `
                            <h4>Continuity Equation</h4>
                            <p>This equation represents the conservation of mass in fluid dynamics. It states that the product of cross-sectional area (A) and velocity (V) remains constant for an incompressible fluid.</p>
                            <p>In our turbine design, the narrowing passage increases wind velocity, which according to Bernoulli's principle, decreases pressure to create rotational force.</p>
                        `;
                    } else if (formula.textContent.includes('P₁ + ½ ρV₁² + ρgh₁')) {
                        explanation.innerHTML = `
                            <h4>Bernoulli's Equation</h4>
                            <p>This principle states that an increase in the speed of a fluid occurs simultaneously with a decrease in pressure. In our turbine:</p>
                            <ul>
                                <li>P = Pressure</li>
                                <li>ρ = Air density (1.225 kg/m³)</li>
                                <li>V = Wind velocity</li>
                                <li>g = Gravity</li>
                                <li>h = Height</li>
                            </ul>
                        `;
                    } else if (formula.textContent.includes('Fₐ = ½ ρ × Cₐ × A × v²')) {
                        explanation.innerHTML = `
                            <h4>Drag Force Equation</h4>
                            <p>This calculates the aerodynamic drag force on our turbine blades:</p>
                            <ul>
                                <li>Fₐ = Drag force</li>
                                <li>ρ = Air density (1.225 kg/m³)</li>
                                <li>Cₐ = Drag coefficient (1.3 concave, 0.5 convex)</li>
                                <li>A = Projected area (0.3104 m²)</li>
                                <li>v = Wind speed</li>
                            </ul>
                        `;
                    }
                    
                    if (!this.querySelector('.formula-explanation')) {
                        this.appendChild(explanation);
                        setTimeout(() => {
                            explanation.style.opacity = '1';
                            explanation.style.transform = 'translateY(0)';
                        }, 10);
                    }
                } else {
                    const exp = this.querySelector('.formula-explanation');
                    if (exp) {
                        exp.style.opacity = '0';
                        exp.style.transform = 'translateY(-10px)';
                        setTimeout(() => exp.remove(), 300);
                    }
                }
            });
        });
    };

    makeFormulasInteractive();

    // ======================
    // 7. DYNAMIC NAVIGATION
    // ======================
    const createDynamicNav = function() {
        const sections = document.querySelectorAll('h2');
        const nav = document.createElement('nav');
        nav.className = 'floating-nav';
        
        const navList = document.createElement('ul');
        sections.forEach(section => {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = section.textContent;
            link.href = `#${section.id || section.textContent.toLowerCase().replace(/\s+/g, '-')}`;
            item.appendChild(link);
            navList.appendChild(item);
        });
        
        nav.appendChild(navList);
        document.body.appendChild(nav);
        
        // Highlight active section
        window.addEventListener('scroll', function() {
            const fromTop = window.scrollY + 100;
            
            navList.querySelectorAll('a').forEach(link => {
                const section = document.querySelector(link.getAttribute('href'));
                if (
                    section.offsetTop <= fromTop &&
                    section.offsetTop + section.offsetHeight > fromTop
                ) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        });
    };

    createDynamicNav();

    // ======================
    // 8. INTERACTIVE TIMELINE
    // ======================
    const createTimeline = function() {
        const methods = document.querySelectorAll('h3:contains("Methods") + ol li');
        if (methods.length > 0) {
            const timeline = document.createElement('div');
            timeline.className = 'project-timeline';
            
            const timelineHeader = document.createElement('h3');
            timelineHeader.textContent = 'Project Development Timeline';
            timeline.appendChild(timelineHeader);
            
            const timelineSteps = document.createElement('div');
            timelineSteps.className = 'timeline-steps';
            
            methods.forEach((method, i) => {
                const step = document.createElement('div');
                step.className = 'timeline-step';
                step.innerHTML = `
                    <div class="step-marker">${i + 1}</div>
                    <div class="step-content">${method.textContent}</div>
                `;
                timelineSteps.appendChild(step);
            });
            
            timeline.appendChild(timelineSteps);
            document.querySelector('h3:contains("Methods")').after(timeline);
            
            // Animate timeline on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const steps = entry.target.querySelectorAll('.timeline-step');
                        steps.forEach((step, index) => {
                            setTimeout(() => {
                                step.style.opacity = '1';
                                step.style.transform = 'translateX(0)';
                            }, index * 200);
                        });
                    }
                });
            }, {threshold: 0.1});
            
            observer.observe(timeline);
        }
    };

    createTimeline();

    // ======================
    // 9. SOCIAL MEDIA SHARING
    // ======================
    const enhanceSocialSharing = function() {
        const socialLinks = document.querySelectorAll('.social_icon a');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
                
                // Add pulse effect
                this.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Special effect for X/Twitter
            if (link.querySelector('svg')) {
                link.addEventListener('mouseenter', function() {
                    const paths = this.querySelectorAll('path');
                    paths.forEach(path => {
                        path.style.fill = '#1DA1F2';
                    });
                });
                
                link.addEventListener('mouseleave', function() {
                    const paths = this.querySelectorAll('path');
                    paths.forEach(path => {
                        path.style.fill = 'white';
                    });
                });
            }
        });
    };

    enhanceSocialSharing();

    // ======================
    // 10. AUTHOR PROFILE EFFECTS
    // ======================
    const enhanceAuthorProfile = function() {
        const authorWell = document.querySelector('.author-well');
        if (authorWell) {
            authorWell.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                
                const img = this.querySelector('.author-img');
                if (img) {
                    img.style.transform = 'scale(1.05)';
                    img.style.filter = 'brightness(1.1)';
                }
            });
            
            authorWell.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                
                const img = this.querySelector('.author-img');
                if (img) {
                    img.style.transform = 'scale(1)';
                    img.style.filter = 'brightness(1)';
                }
            });
            
            // Click effect to show more info
            authorWell.addEventListener('click', function() {
                const info = this.querySelector('.author-info');
                info.classList.toggle('expanded');
                
                if (info.classList.contains('expanded')) {
                    info.innerHTML += `
                        <div class="author-details">
                            <p>Lead Developer & Designer</p>
                            <p>STEM High School for Boys</p>
                            <div class="author-social">
                                <a href="https://www.linkedin.com/in/ziad-salem-5a7087350" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                                <a href="https://github.com/ziademad" target="_blank"><i class="fab fa-github"></i></a>
                            </div>
                        </div>
                    `;
                } else {
                    const details = this.querySelector('.author-details');
                    if (details) details.remove();
                }
            });
        }
    };

    enhanceAuthorProfile();

    // ======================
    // 11. DYNAMIC FOOTER
    // ======================
    const updateFooter = function() {
        const yearSpan = document.querySelector('.copyright-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
        
        // Add visitor counter
        const counter = document.createElement('div');
        counter.className = 'visitor-counter';
        counter.innerHTML = `
            <i class="fas fa-users"></i>
            <span class="count">${Math.floor(Math.random() * 1000) + 500}</span> visitors
        `;
        document.querySelector('.copyright .container .row').appendChild(counter);
    };

    updateFooter();

    // ======================
    // 12. RESPONSIVE MENU
    // ======================
    const createMobileMenu = function() {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.prepend(menuToggle);
        
        const nav = document.querySelector('.floating-nav');
        if (nav) {
            menuToggle.addEventListener('click', function() {
                nav.classList.toggle('active');
                this.classList.toggle('active');
                
                if (nav.classList.contains('active')) {
                    nav.style.transform = 'translateX(0)';
                } else {
                    nav.style.transform = 'translateX(-100%)';
                }
            });
        }
    };

    createMobileMenu();

    // ======================
    // 13. THEME TOGGLE
    // ======================
    const createThemeToggle = function() {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = `
            <button id="themeBtn">
                <i class="fas fa-moon"></i>
            </button>
        `;
        document.body.appendChild(themeToggle);
        
        const themeBtn = document.getElementById('themeBtn');
        
        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                this.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                this.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    };

    createThemeToggle();

    // ======================
    // 14. SCROLL PROGRESS INDICATOR
    // ======================
    const createScrollProgress = function() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };

    createScrollProgress();

    // ======================
    // 15. INTERACTIVE 3D MODEL VIEWER
    // ======================
    const createModelViewer = function() {
        const modelFigures = document.querySelectorAll('.figure img[alt*="design"]');
        
        modelFigures.forEach(figure => {
            const container = figure.closest('.figure');
            if (container) {
                container.classList.add('3d-model-container');
                
                const rotateNotice = document.createElement('div');
                rotateNotice.className = 'rotate-notice';
                rotateNotice.innerHTML = '<i class="fas fa-arrows-rotate"></i> Click & drag to rotate';
                container.appendChild(rotateNotice);
                
                // Add click to enlarge functionality
                container.addEventListener('click', function(e) {
                    if (e.target.tagName === 'IMG') {
                        const overlay = document.createElement('div');
                        overlay.className = 'model-overlay';
                        overlay.innerHTML = `
                            <div class="model-content">
                                <img src="${e.target.src}" alt="${e.target.alt}">
                                <button class="close-model"><i class="fas fa-times"></i></button>
                            </div>
                        `;
                        document.body.appendChild(overlay);
                        
                        // Add rotation controls to enlarged view
                        let isDragging = false;
                        let startX, startY, currentX = 0, currentY = 0;
                        const img = overlay.querySelector('img');
                        
                        img.addEventListener('mousedown', (e) => {
                            isDragging = true;
                            startX = e.clientX;
                            startY = e.clientY;
                        });
                        
                        window.addEventListener('mousemove', (e) => {
                            if (!isDragging) return;
                            
                            const deltaX = e.clientX - startX;
                            const deltaY = e.clientY - startY;
                            
                            currentX += deltaX * 0.5;
                            currentY += deltaY * 0.5;
                            
                            img.style.transform = `rotateX(${-currentY}deg) rotateY(${currentX}deg)`;
                            
                            startX = e.clientX;
                            startY = e.clientY;
                        });
                        
                        window.addEventListener('mouseup', () => {
                            isDragging = false;
                        });
                        
                        overlay.querySelector('.close-model').addEventListener('click', () => {
                            overlay.style.opacity = '0';
                            setTimeout(() => overlay.remove(), 300);
                        });
                        
                        setTimeout(() => {
                            overlay.style.opacity = '1';
                        }, 10);
                    }
                });
            }
        });
    };

    createModelViewer();
});

// Helper function to check if an element contains specific text
(function() {
    const matches = function(el, selector) {
        return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    };
    
    // :contains polyfill
    const containsSelector = function() {
        const style = document.createElement('style');
        document.head.appendChild(style);
        const sheet = style.sheet;
        
        sheet.insertRule(':contains(test) { }', 0);
        return sheet.cssRules[0].selectorText === ':contains(test)';
    };
    
    if (!containsSelector()) {
        const originalQuerySelectorAll = document.querySelectorAll;
        
        document.querySelectorAll = function(selector) {
            if (selector.indexOf(':contains(') === -1) {
                return originalQuerySelectorAll.call(this, selector);
            }
            
            const parts = selector.split(':contains(');
            const before = parts[0];
            const text = parts[1].split(')')[0];
            const after = parts[1].substring(text.length + 1);
            
            const elements = originalQuerySelectorAll.call(this, before + after);
            const matches = [];
            
            elements.forEach(element => {
                if (element.textContent.includes(text)) {
                    matches.push(element);
                }
            });
            
            return matches;
        };
    }
})();
// Team member animation
document.addEventListener('DOMContentLoaded', function() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {threshold: 0.1});
    
    teamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(member);
    });
    
    // Add click event to show more info
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            // Create and show a modal with more info
            const modal = document.createElement('div');
            modal.className = 'member-modal';
            
            const name = this.querySelector('h3').textContent;
            const role = this.querySelector('p').textContent;
            const imgSrc = this.querySelector('img').src;
            
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="modal-photo">
                        <img src="${imgSrc}" alt="${name}">
                    </div>
                    <h2>${name}</h2>
                    <h3>${role}</h3>
                    <div class="member-details">
                        <p>Contribution details would go here...</p>
                        <div class="member-social">
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                            <a href="#"><i class="fab fa-github"></i></a>
                            <a href="#"><i class="fas fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });
            
            // Close when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
});