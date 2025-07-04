        const EMBED_ORIGIN = 'https://realtreasury.com';
        let treasuryTechPortal;

        function postHeight() {
            if (window.parent !== window) {
                const h = Math.max(
                    document.documentElement.scrollHeight,
                    document.documentElement.offsetHeight,
                    document.body.scrollHeight,
                    document.body.offsetHeight,
                    window.innerHeight
                );
                window.parent.postMessage({ 
                    type: "treasury-height",
                    height: h + 100
                }, "*");
                try {
                    window.parent.postMessage({ 
                        type: "treasury-height",
                        height: h + 100
                    }, EMBED_ORIGIN);
                } catch(e) {
                    /* Ignore if origin mismatch */
                }
            }
        }

function debounce(fn, delay) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
    };
}

const debouncedPostHeight = debounce(postHeight, 100);

// Post height more frequently and reliably
window.addEventListener('load', () => {
    setTimeout(postHeight, 100);
    setTimeout(postHeight, 500);
    setTimeout(postHeight, 1000);
});
window.addEventListener('resize', debouncedPostHeight);

new ResizeObserver(() => {
    debouncedPostHeight();
}).observe(document.body);

new MutationObserver(() => {
    debouncedPostHeight();
}).observe(document.body, { 
    childList: true, 
    subtree: true, 
    attributes: true,
    attributeFilter: ['style', 'class']
});

document.addEventListener('DOMContentLoaded', () => {
    treasuryTechPortal = new TreasuryTechPortal();
    
    // Ensure iframe height is set after content loads
    setTimeout(() => {
        if (typeof postHeight === 'function') {
            postHeight();
        }
    }, 1500);
    
    // Handle window resize to properly enable/disable mobile features
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Close any open menus on mobile
            if (treasuryTechPortal.sideMenuOpen) treasuryTechPortal.closeSideMenu();
            if (treasuryTechPortal.shortlistMenuOpen) treasuryTechPortal.closeShortlistMenu();
        } else {
            // Re-enable sidebar functionality on desktop
            treasuryTechPortal.renderShortlist();
        }
        
        // Update height after resize
        setTimeout(() => {
            if (typeof postHeight === 'function') {
                postHeight();
            }
        }, 200);
    });
});
        class TreasuryTechPortal {
            constructor() {
                this.TREASURY_TOOLS = [
                    // TRMS
                    {
                        "name": "Kyriba",
                        "category": "TRMS",
                        "desc": "Market-leading cloud treasury platform serving 3,000+ global clients with AI-powered cash forecasting, comprehensive risk management, and advanced derivatives trading capabilities.",
                        "features": ["AI-driven cash forecasting", "Real-time risk analytics", "Derivatives management", "Multi-bank connectivity", "Regulatory compliance", "Hedge accounting automation"],
                        "target": "Large enterprises and multinational corporations with complex treasury operations",
                        "videoUrl": "https://realtreasury.com/kyriba-06-2025/",
                        "websiteUrl": "https://www.kyriba.com/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Kyriba.png"
                    }, {
                        "name": "GTreasury",
                        "category": "TRMS",
                        "desc": "Enterprise treasury platform known for deep ERP integration, advanced reporting, and sophisticated multi-entity consolidation for complex organizational structures.",
                        "features": ["Deep ERP integration", "Multi-entity consolidation", "Advanced analytics", "Customizable workflows", "Real-time reporting", "API connectivity"],
                        "target": "Fortune 500 companies requiring complex consolidation and reporting",
                        "videoUrl": "https://youtu.be/06Kjx3X748I?si=inoxdyJF9LEfuP_j",
                        "websiteUrl": "https://gtreasury.com/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/GTreasury.png"
                    }, {
                        "name": "Reval",
                        "category": "TRMS",
                        "desc": "Comprehensive treasury and risk platform owned by ION Group, specializing in sophisticated derivatives valuation, hedge accounting, and regulatory reporting.",
                        "features": ["Derivatives valuation", "Hedge accounting", "Market data integration", "Risk analytics", "Regulatory reporting", "Trade capture"],
                        "target": "Financial institutions and corporations with complex derivative portfolios",
                        "videoUrl": "https://youtu.be/WTYKRBzst-w?si=YiP8RFt1VOkFwH0o",
                        "websiteUrl": "https://iongroup.com/products/treasury/reval/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/ION-Treasury.png"
                    }, {
                        "name": "Quantum",
                        "category": "TRMS",
                        "desc": "Advanced treasury management system with real-time risk analytics, portfolio optimization, and sophisticated hedging strategies for financial institutions.",
                        "features": ["Real-time risk monitoring", "Portfolio optimization", "Stress testing", "Automated hedging", "Compliance controls", "Advanced analytics"],
                        "target": "Investment banks and large financial institutions",
                        "videoUrl": "https://youtu.be/RAWH8-FUdpQ?si=2E8JU7N-pP0rtqUr",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/FIS.png"
                    }, {
                        "name": "WallStreet Suite",
                        "category": "TRMS",
                        "desc": "Complete treasury and risk platform with multi-asset support, advanced analytics, and comprehensive regulatory reporting for complex financial operations.",
                        "features": ["Multi-asset support", "Advanced analytics", "Regulatory compliance", "Trade management", "Risk controls", "Market data feeds"],
                        "target": "Large banks and corporations requiring full-scale treasury operations",
                        "videoUrl": "https://youtu.be/WTYKRBzst-w?si=YiP8RFt1VOkFwH0o",
                        "websiteUrl": "https://iongroup.com/products/treasury/wallstreet-suite/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/ION-Treasury.png"
                    }, {
                        "name": "ATOM",
                        "category": "TRMS",
                        "desc": "Enterprise treasury platform focused on derivatives trading, risk management, and automated workflow processing for sophisticated financial operations.",
                        "features": ["Derivatives trading", "Automated workflows", "Risk management", "Trade processing", "Compliance monitoring", "Real-time analytics"],
                        "target": "Large corporations and financial institutions with active trading operations",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/ATOM-TM.png"
                    }, {
                        "name": "Integrity",
                        "category": "TRMS",
                        "desc": "Enterprise treasury solution emphasizing governance, compliance, and audit trails for highly regulated financial environments and complex organizational structures.",
                        "features": ["Governance controls", "Audit trails", "Compliance management", "Policy enforcement", "Risk controls", "Workflow approval"],
                        "target": "Highly regulated industries requiring strict governance and compliance",
                        "videoUrl": "https://youtu.be/RAWH8-FUdpQ?si=2E8JU7N-pP0rtqUr",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/FIS.png"
                    }, {
                        "name": "IT2",
                        "category": "TRMS",
                        "desc": "Integrated treasury technology platform combining cash management, risk analytics, and payment processing in a unified enterprise solution.",
                        "features": ["Integrated platform", "Cash management", "Risk analytics", "Payment processing", "Bank connectivity", "Unified reporting"],
                        "target": "Large enterprises seeking integrated treasury technology solutions",
                        "videoUrl": "https://youtu.be/WTYKRBzst-w?si=YiP8RFt1VOkFwH0o",
                        "websiteUrl": "https://iongroup.com/products/treasury/it2/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/ION-Treasury.png"
                    }, {
                        "name": "Datalog",
                        "category": "TRMS",
                        "desc": "Treasury management system with powerful analytics engine, multi-entity support, and comprehensive reporting capabilities for complex treasury operations.",
                        "features": ["Advanced analytics", "Multi-entity support", "Data visualization", "Custom reporting", "Cash positioning", "Risk monitoring"],
                        "target": "Large corporations requiring sophisticated analytics and reporting",
                        "videoUrl": "https://youtu.be/qX_iOGiuNwM?si=omRZs79-y3pyZRdk",
                        "websiteUrl": "https://www.datalog-finance.com/en/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Datalog-logo.png"
                    }, {
                        "name": "Coupa",
                        "category": "TRMS",
                        "desc": "Business spend management platform with integrated treasury operations, procurement workflows, and comprehensive spend analytics for enterprise organizations.",
                        "features": ["Spend management", "Treasury integration", "Procurement workflows", "Supplier management", "Analytics dashboard", "Automation tools"],
                        "target": "Large enterprises requiring integrated spend and treasury management",
                        "videoUrl": "https://youtu.be/NSeXuo6f-dw?si=sxvZ3KpwVcPA8eMC",
                        "websiteUrl": "https://www.coupa.com/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Coupa.png"
                    }, {
                        "name": "Treasury Cube",
                        "category": "TRMS",
                        "desc": "Modular treasury platform with customizable features and scalable architecture that grows with your business needs and treasury complexity.",
                        "features": ["Modular design", "Customizable features", "Scalable architecture", "Growth-focused", "Flexible pricing", "Configurable workflows"],
                        "target": "Growing companies requiring scalable and customizable treasury solutions",
                        "websiteUrl": "https://treasurycube.com/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Treasury-Cube.png"
                    },

                    // CASH
                    {
                        "name": "Trovata",
                        "category": "CASH",
                        "desc": "AI-powered cash management platform providing real-time bank connectivity, predictive forecasting, and intelligent cash visibility for modern finance teams.",
                        "features": ["AI forecasting", "Real-time connectivity", "Predictive analytics", "Cash visibility", "Mobile access", "API integration"],
                        "target": "Mid to large companies seeking AI-driven cash management solutions",
                        "videoUrl": "https://youtu.be/Vx4At4BN-og",
                        "websiteUrl": "https://trovata.io/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Trovata.png"
                    }, {
                        "name": "Tesorio",
                        "category": "CASH",
                        "desc": "Machine learning-powered cash flow optimization platform that automates forecasting, scenario planning, and cash management workflows.",
                        "features": ["ML optimization", "Automated forecasting", "Scenario planning", "Workflow automation", "Integration tools", "Performance analytics"],
                        "target": "Growth companies and mid-market businesses optimizing cash flow",
                        "websiteUrl": "https://www.tesorio.com/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Tesorio.jpg"
                    }, {
                        "name": "Autocash",
                        "category": "CASH",
                        "desc": "AI-first cash management solution with predictive analytics, automated scenario modeling, and intelligent cash optimization recommendations.",
                        "features": ["AI predictions", "Automated scenarios", "Smart recommendations", "Risk assessment", "Cash optimization", "Intelligent alerts"],
                        "target": "Tech-forward companies embracing AI-driven financial operations",
                        "videoUrl": "https://youtu.be/vcSdH5wcx5c?si=rhvCylzfg54nLuxB",
                        "websiteUrl": "https://www.autocash.ai/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/AutoCash.png"
                    }, {
                        "name": "Balance",
                        "category": "CASH",
                        "desc": "Real-time cash visibility platform with automated bank reconciliation, multi-currency support, and streamlined cash positioning capabilities.",
                        "features": ["Real-time visibility", "Auto reconciliation", "Multi-currency", "Cash positioning", "Bank connectivity", "Streamlined UX"],
                        "target": "Companies needing real-time cash visibility and automated reconciliation",
                        "websiteUrl": "https://www.balancecash.io/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Balance-Cash.jpg"
                    }, {
                        "name": "Nilus",
                        "category": "CASH",
                        "desc": "Advanced cash forecasting platform with sophisticated scenario planning, variance analysis, and performance tracking for precise liquidity management.",
                        "features": ["Advanced forecasting", "Scenario planning", "Variance analysis", "Performance tracking", "Budget integration", "Precision modeling"],
                        "target": "Companies requiring sophisticated cash forecasting and scenario analysis",
                        "websiteUrl": "https://www.nilus.com/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Nilus.png"
                    }, {
                        "name": "Obol",
                        "category": "CASH",
                        "desc": "Digital treasury platform focused on liquidity optimization, real-time cash visibility, and modern workflow automation for finance teams.",
                        "features": ["Liquidity optimization", "Digital workflows", "Real-time data", "Modern interface", "Mobile platform", "Automated reporting"],
                        "target": "Modern finance teams seeking digital-first cash management solutions",
                        "videoUrl": "https://youtu.be/7XGzkaVSZzc?si=uxCD7HYRUmssywNa",
                        "websiteUrl": "https://www.obol.app/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Obol.png"
                    }, {
                        "name": "Panax",
                        "category": "CASH",
                        "desc": "Working capital optimization platform specializing in payment timing analytics, A/R and A/P integration, and cash flow enhancement strategies.",
                        "features": ["Working capital optimization", "Payment timing analytics", "A/R & A/P integration", "Cash flow enhancement", "Performance tracking", "Optimization tools"],
                        "target": "Companies focused on working capital optimization and payment timing",
                        "videoUrl": "https://youtu.be/p2svAyM74nI?si=zFPF_QZkgBo2rbz8",
                        "websiteUrl": "https://www.thepanax.com/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Panax.png"
                    }, {
                        "name": "Statement",
                        "category": "CASH",
                        "desc": "Automated bank statement processing platform with intelligent data extraction, reconciliation tools, and seamless integration capabilities.",
                        "features": ["Automated processing", "Data extraction", "Reconciliation tools", "Data validation", "Exception handling", "API integration"],
                        "target": "Companies seeking automated bank statement processing and data extraction",
                        "websiteUrl": "https://www.statement.io/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Statement.png"
                    }, {
                        "name": "Treasury Suite",
                        "category": "CASH",
                        "desc": "Comprehensive cash management suite combining forecasting, positioning, liquidity optimization, and workflow management in an integrated platform.",
                        "features": ["Comprehensive suite", "Cash forecasting", "Liquidity optimization", "Workflow management", "Bank connectivity", "Integrated platform"],
                        "target": "Companies requiring a complete cash management suite with integrated functionality",
                        "websiteUrl": "https://www.treasurysuite.com/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Treasury-Suite-Logo-PNG.png"
                    }, {
                        "name": "Vesto",
                        "category": "CASH",
                        "desc": "Cash positioning platform offering multibank cash flow monitoring and liquidity management capabilities.",
                        "features": ["Yield optimization", "Risk monitoring", "Investment tracking", "Liquidity management", "Performance analytics", "Compliance tools"],
                        "target": "Companies with significant cash positions seeking yield optimization",
                        "videoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Vesto-06-2025.mp4",
                        "websiteUrl": "https://www.vesto.com/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Vesto.png"
                    },

                    // LITE
                    {
                        "name": "Treasura",
                        "category": "LITE",
                        "desc": "User-friendly treasury management system offering essential cash and risk management features with simplified implementation and competitive pricing.",
                        "features": ["User-friendly", "Essential features", "Simplified setup", "Competitive pricing", "Basic reporting", "Standard integrations"],
                        "target": "Mid-market companies seeking accessible treasury management solutions",
                        "videoUrl": "https://youtu.be/WTYKRBzst-w?si=YiP8RFt1VOkFwH0o",
                        "websiteUrl": "https://iongroup.com/products/treasury/treasura/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/ION-Treasury.png"
                    }, {
                        "name": "Treasury Curve",
                        "category": "LITE",
                        "desc": "Simplified treasury management solution focusing on core functionality with intuitive interface and streamlined user experience.",
                        "features": ["Simplified interface", "Core functionality", "Easy setup", "Streamlined UX", "Basic reporting", "Cost-effective"],
                        "target": "Companies seeking simplified treasury management with core functionality",
                        "videoUrl": "https://youtu.be/5pD7P1fOYPU?si=lgolb0x0I9dJWTcv",
                        "websiteUrl": "https://www.treasurycurve.com/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Treasury-Curve.png"
                    }, {
                        "name": "Bottomline",
                        "category": "LITE",
                        "desc": "Payment automation and cash management platform with strong banking integration, fraud protection, and multi-bank connectivity.",
                        "features": ["Payment automation", "Fraud protection", "Banking integration", "Multi-bank support", "Security controls", "Workflow tools"],
                        "target": "Companies prioritizing payment automation and banking integration",
                        "websiteUrl": "https://www.bottomline.com/us?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/bottomline-technologies-logo.png"
                    }, {
                        "name": "City Financials",
                        "category": "LITE",
                        "desc": "Treasury system specifically designed for mid-market companies with growth-oriented features, quick implementation, and scalable pricing.",
                        "features": ["Mid-market focus", "Growth-oriented", "Quick implementation", "Scalable pricing", "Support included", "Practical features"],
                        "target": "Mid-market companies seeking practical and growth-oriented solutions",
                        "videoUrl": "https://youtu.be/WTYKRBzst-w?si=YiP8RFt1VOkFwH0o",
                        "websiteUrl": "https://iongroup.com/products/treasury/city-financials/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/ION-Treasury.png"
                    }, {
                        "name": "HighRadius",
                        "category": "LITE",
                        "desc": "Autonomous finance platform combining AI-powered accounts receivable optimization with treasury management for integrated financial operations.",
                        "features": ["AI automation", "A/R optimization", "Treasury integration", "Machine learning", "Process automation", "Autonomous finance"],
                        "target": "Companies seeking AI-powered automation for A/R and treasury operations",
                        "videoUrl": "https://youtu.be/B0gngAz85js?si=K2r1E4GwX5VaGwVn",
                        "websiteUrl": "https://www.highradius.com/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/High-Radius.png"
                    }, {
                        "name": "Treasury4",
                        "category": "LITE",
                        "desc": "Next-generation treasury platform with modern UI/UX, cloud-native architecture, and intuitive workflows designed for the modern finance professional.",
                        "features": ["Modern UI/UX", "Cloud-native", "Intuitive workflows", "API-first design", "Mobile responsive", "Quick deployment"],
                        "target": "Modern finance teams seeking next-generation treasury technology",
                        "videoUrl": "https://youtu.be/dYBPUYNZ_nE?si=BHMRUFAYJlvs1a6P",
                        "websiteUrl": "https://www.treasury4.com/?utm_source=realtreasury&utm_medium=website&utm_campaign=vendor_referral",
                        "logoUrl": "https://realtreasury.com/wp-content/uploads/2025/06/Treasury4Logo-GraphiteGreen.png"
                    }
                ];

                // Category information with videos
                this.CATEGORY_INFO = {
                    CASH: {
                        name: "Cash Tools",
                        badge: "Essential",
                        description: "Cash Tools are the essential first step for treasury teams moving away from manual spreadsheets. These platforms provide a single, unified view of bank balances and transactions through direct bank connections (via API or files). They excel at providing clear, real-time cash visibility and basic forecasting, allowing businesses to understand their current cash position and anticipate future needs without the complexity of a full TRMS.",
                        features: [
                            "Bank Connectivity (API, SFTP)",
                            "Basic Forecasting Tools",
                            "Cash Visibility",
                            "Transaction Search, Sort, Tag, Group"
                        ],
                        videoUrl: ""
                    },
                    LITE: {
                        name: "TMS-Lite",
                        badge: "Scalable",
                        description: "TMS-Lite solutions bridge the gap between basic Cash Tools and enterprise TRMS platforms. They build upon cash visibility by adding crucial treasury functions like multi-currency cash positioning, initiating treasury payments (wires, transfers), and managing basic financial instruments like foreign exchange contracts. These systems are ideal for growing companies whose needs have outpaced simple cash tools but do not yet require the full complexity of an enterprise system.",
                        features: [
                            "Bank Connectivity (API, SFTP)",
                            "Basic Forecasting Tools",
                            "Cash Visibility",
                            "Transaction Search, Sort, Tag, Group",
                            "Cash Positioning",
                            "Market Data",
                            "Treasury Payments (API, SFTP)"
                        ],
                        videoUrl: ""
                    },
                    TRMS: {
                        name: "Treasury & Risk Management Systems (TRMS)",
                        badge: "Advanced",
                        description: "Treasury & Risk Management Systems (TRMS) are comprehensive platforms for large, complex organizations. They offer a broad suite of tightly integrated modules far beyond cash visibility, covering debt and investment management, advanced financial risk analysis (FX, interest rates, commodities), hedge accounting, global payments, and in-house banking. These systems are designed to centralize and automate sophisticated treasury workflows.",
                        features: [
                            "Bank Connectivity (API, SFTP)",
                            "Basic Forecasting Tools",
                            "Cash Visibility",
                            "Transaction Search, Sort, Tag, Group",
                            "Cash Positioning",
                            "Market Data",
                            "Treasury Payments (API, SFTP)",
                            "Derivatives (Interest, FX)",
                            "Intercompany Loans",
                            "Instrument Valuations",
                            "AI Forecasting",
                            "AI Insights",
                            "AP Payments",
                            "Bank Account Management",
                            "Basic FX (Spots, FWD)",
                            "Cash Accounting",
                            "Debt Management",
                            "Deal Accounting",
                            "In-House Banking",
                            "Investments",
                            "SWIFT Connectivity"
                        ],
                        videoUrl: ""
                    }
                };

                const cashTags = ["Bank Connectivity", "Basic Forecasting Tools", "Cash Visibility", "Transaction Search, Sort, Tag, Group"];
                const liteTags = [...cashTags, "Cash Positioning", "Market Data", "Treasury Payments"];
                const trmsTags = [...liteTags, "AI Forecasting", "AI Insights", "AP Payments", "Bank Account Management", "Basic FX (Spots, FWD)", "Cash Accounting", "Debt Management", "Deal Accounting", "In-House Banking", "Investments", "SWIFT Connectivity", "Derivatives (Interest, FX)", "Intercompany Loans", "Instrument Valuations"];

                this.CATEGORY_TAGS = {
                    CASH: cashTags,
                    LITE: liteTags,
                    TRMS: trmsTags
                };

                this.currentFilter = 'ALL';
                this.searchTerm = '';
                this.filteredTools = [];
                this.allTags = [];
                this.advancedFilters = { features: [], hasVideo: false };
                this.currentSort = 'name';
                this.currentView = 'grid';
                this.groupByCategory = true;
                this.sideMenuOpen = false;
                this.shortlist = [];
                this.shortlistMenuOpen = false;
                this.touchDragTool = null;
                this.previousFocusedElement = null;
                this.handleOutsideSideMenuClick = (e) => {
                    const sideMenu = document.getElementById('sideMenu');
                    const toggle = document.getElementById('sideMenuToggle');
                    const externalToggle = document.getElementById('externalMenuToggle');
                    if (sideMenu && !sideMenu.contains(e.target) &&
                        !toggle?.contains(e.target) &&
                        !externalToggle?.contains(e.target)) {
                        e.stopPropagation();
                        this.closeSideMenu();
                    }
                };

                this.handleOutsideShortlistMenuClick = (e) => {
                    const menu = document.getElementById('shortlistMenu');
                    const toggle = document.getElementById('shortlistMenuToggle');
                    const externalToggle = document.getElementById('externalShortlistToggle');
                    if (menu && !menu.contains(e.target) &&
                        !toggle?.contains(e.target) &&
                        !externalToggle?.contains(e.target)) {
                        this.closeShortlistMenu();
                    }
                };

                this.init();
            }

            isMobile() {
                return window.matchMedia('(max-width: 768px)').matches;
            }

            handleResponsive() {
                const mobile = this.isMobile();
                document.querySelectorAll('.tool-card').forEach(card => {
                    card.draggable = !mobile;
                });
                if (mobile) {
                    this.closeSideMenu();
                    this.closeShortlistMenu();
                }
            }

            init() {
                this.assignTags();
                this.setupInteractions();
                this.setupSearch();
                this.setupModals();
                this.setupSideMenu();
                this.setupShortlistMenu();
                this.setupBottomNav();
                this.updateCounts();
                this.populateCategoryTags();
                this.filterAndDisplayTools();
                this.applyViewStyles();

                this.handleResponsive();
                window.addEventListener('resize', () => this.handleResponsive());

                setTimeout(() => {
                    const loading = document.getElementById('loadingScreen');
                    if (loading) loading.style.display = 'none';
                }, 800);
            }

            assignTags() {
                this.TREASURY_TOOLS.forEach(tool => {
                    const tags = this.CATEGORY_TAGS[tool.category] || [];
                    tool.tags = [...tags].sort((a, b) => a.localeCompare(b));
                });
            }

            setupInteractions() {
                document.querySelectorAll('.filter-tab').forEach(tab => {
                    tab.addEventListener('click', (e) => {
                        document.querySelector('.filter-tab.active')?.classList.remove('active');
                        e.target.classList.add('active');
                        this.currentFilter = e.target.dataset.category;
                        this.filterAndDisplayTools();
                    });
                });

                document.querySelectorAll('.category-header').forEach(header => {
                    header.addEventListener('click', (e) => {
                        if (e.target.closest('.show-more-category-tags-btn') ||
                            e.target.closest('.show-less-category-tags-btn')) {
                            return;
                        }

                        const category = header.dataset.category;
                        if (category && this.CATEGORY_INFO[category]) {
                            this.showCategoryModal(this.CATEGORY_INFO[category], category);
                        }
                    });
                });

                document.getElementById('mainContent').addEventListener('click', (e) => {
                    if (e.target.classList.contains('show-more-tags-btn')) {
                        e.stopPropagation();
                        const toolName = e.target.dataset.toolName;
                        const tool = this.TREASURY_TOOLS.find(t => t.name === toolName);
                        if (tool) {
                            const tagsContainer = e.target.parentElement;
                            const sortedTags = [...tool.tags].sort((a, b) => a.localeCompare(b));
                            tagsContainer.innerHTML = sortedTags.map(tag => `<span class="tool-tag">${tag}</span>`).join('');
                            tagsContainer.innerHTML += `<button class="show-less-tags-btn" data-tool-name="${tool.name}">Show less</button>`;
                        }
                    } else if (e.target.classList.contains('show-less-tags-btn')) {
                        e.stopPropagation();
                        const toolName = e.target.dataset.toolName;
                        const tool = this.TREASURY_TOOLS.find(t => t.name === toolName);
                        if (tool) {
                            const tagsContainer = e.target.parentElement;
                            const sortedTags = [...tool.tags].sort((a, b) => a.localeCompare(b));
                            const displayTags = sortedTags.slice(0, 3);
                            const hasMore = sortedTags.length > 3;
                            tagsContainer.innerHTML = displayTags.map(tag => `<span class="tool-tag">${tag}</span>`).join('');
                            if (hasMore) {
                                tagsContainer.innerHTML += `<button class="show-more-tags-btn" data-tool-name="${tool.name}">... more</button>`;
                            }
                        }
                    } else if (e.target.classList.contains('show-more-category-tags-btn')) {
                        e.stopPropagation();
                        const category = e.target.dataset.category;
                        const tagsContainer = e.target.parentElement;
                        const tags = this.CATEGORY_TAGS[category] || [];
                        const sorted = [...tags].sort((a, b) => a.localeCompare(b));
                        tagsContainer.innerHTML = sorted.map(tag => `<span class="category-tag">${tag}</span>`).join('');
                        tagsContainer.innerHTML += `<button class="show-less-category-tags-btn" data-category="${category}">Show less</button>`;
                    } else if (e.target.classList.contains('show-less-category-tags-btn')) {
                        e.stopPropagation();
                        const category = e.target.dataset.category;
                        const tagsContainer = e.target.parentElement;
                        const tags = this.CATEGORY_TAGS[category] || [];
                        const sorted = [...tags].sort((a, b) => a.localeCompare(b));
                        const displayTags = sorted.slice(0, 3);
                        const hasMore = sorted.length > 3;
                        tagsContainer.innerHTML = displayTags.map(tag => `<span class="category-tag">${tag}</span>`).join('');
                        if (hasMore) {
                            tagsContainer.innerHTML += `<button class="show-more-category-tags-btn" data-category="${category}">... more</button>`;
                        }
                    }
                });
            }

            setupSearch() {
                const searchInput = document.getElementById('searchInput');
                const searchClear = document.getElementById('searchClear');

                if (searchInput) {
                    searchInput.addEventListener('input', (e) => {
                        this.searchTerm = e.target.value.toLowerCase();
                        if (searchClear) searchClear.style.display = this.searchTerm ? 'block' : 'none';
                        this.filterAndDisplayTools();
                    });

                    searchInput.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            this.closeSideMenu();
                        }
                    });
                }

                if (searchClear) {
                    searchClear.addEventListener('click', () => {
                        if (searchInput) {
                            searchInput.value = '';
                            searchInput.focus(); // Keep focus on the input after clearing
                        }
                        this.searchTerm = '';
                        searchClear.style.display = 'none';
                        this.filterAndDisplayTools();
                    });
                }
            }

            setupTagSearch() {
                const searchInput = document.getElementById('tagSearchInput');
                const searchClear = document.getElementById('tagSearchClear');

                if (searchInput) {
                    searchInput.addEventListener('input', () => {
                        const term = searchInput.value.toLowerCase();
                        if (searchClear) searchClear.style.display = term ? 'block' : 'none';
                        this.filterTagCheckboxes(term);
                    });
                }

                if (searchClear) {
                    searchClear.addEventListener('click', () => {
                        if (searchInput) {
                            searchInput.value = '';
                            searchInput.focus();
                        }
                        searchClear.style.display = 'none';
                        this.filterTagCheckboxes('');
                    });
                }
            }

            filterTagCheckboxes(term) {
                const container = document.getElementById('tagFilters');
                if (!container) return;
                const items = container.querySelectorAll('.checkbox-item');
                items.forEach(item => {
                    const label = item.textContent.toLowerCase();
                    item.style.display = label.includes(term) ? 'flex' : 'none';
                });

                const showMore = document.getElementById('showMoreTagFilters');
                const showLess = document.getElementById('showLessTagFilters');
                const extra = document.getElementById('extraTagFilters');
                if (showMore && showLess && extra) {
                    if (term) {
                        extra.style.display = 'block';
                        showMore.style.display = 'none';
                        showLess.style.display = 'none';
                    } else {
                        extra.style.display = 'none';
                        showLess.style.display = 'none';
                        showMore.style.display = 'inline-block';
                    }
                }
            }

            setupModals() {
                const toolModal = document.getElementById('toolModal');
                const toolModalClose = document.getElementById('modalClose');

                if (toolModalClose) {
                    toolModalClose.addEventListener('click', () => this.closeModal('toolModal'));
                }
                if (toolModal) {
                    toolModal.addEventListener('click', (e) => {
                        if (e.target.closest('.modal-content') === null) this.closeModal('toolModal');
                    });
                }

                const categoryModal = document.getElementById('categoryModal');
                const categoryModalClose = document.getElementById('categoryModalClose');

                if (categoryModalClose) {
                    categoryModalClose.addEventListener('click', () => this.closeModal('categoryModal'));
                }
                if (categoryModal) {
                    categoryModal.addEventListener('click', (e) => {
                        if (e.target.closest('.modal-content') === null) this.closeModal('categoryModal');
                    });
                }

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        this.closeModal('toolModal');
                        this.closeModal('categoryModal');
                    }
                });
            }
            
            openModal(modal) {
                 if (modal) {
                    this.previousFocusedElement = document.activeElement;
                    modal.classList.add('show');
                    document.body.classList.add('modal-open');

                    const focusable = modal.querySelector('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
                    if (focusable) {
                        focusable.focus();
                    } else {
                        const content = modal.querySelector('.modal-content');
                        if (content) content.focus();
                    }
                }
            }

            showToolModal(tool) {
                const modal = document.getElementById('toolModal');
                const modalTitle = document.getElementById('modalTitle');
                const modalDescription = document.getElementById('modalDescription');
                const modalWebsiteLink = document.getElementById('modalWebsiteLink');
                const modalBody = modal?.querySelector('.modal-body');
                const modalLogo = document.getElementById('modalToolLogo');

                if (!modal || !modalBody) return;

                // 1. Update the static content first
                if (modalTitle) modalTitle.textContent = tool.name;
                if (modalDescription) modalDescription.textContent = tool.desc;

                if (modalWebsiteLink) {
                    if (tool.websiteUrl) {
                        modalWebsiteLink.href = tool.websiteUrl;
                        modalWebsiteLink.style.display = 'inline-flex';
                    } else {
                        modalWebsiteLink.style.display = 'none';
                    }
                }

                if (modalLogo) {
                    if (tool.logoUrl) {
                        modalLogo.src = tool.logoUrl;
                        modalLogo.alt = `${tool.name} logo`;
                        modalLogo.style.display = 'block';
                    } else {
                        modalLogo.style.display = 'none';
                    }
                }

                // 2. Remove any video section from a previous click
                const existingVideoSection = modalBody.querySelector('.video-demo-section');
                if (existingVideoSection) {
                    existingVideoSection.remove();
                }

                // 3. Add a new video section if the current tool has one
                if (tool.videoUrl) {
                    const videoSection = document.createElement('div');
                    // Add a specific class to make it easy to find and remove later
                    videoSection.className = 'feature-section video-demo-section';

                    let embedUrl = tool.videoUrl;
                    if (tool.videoUrl.includes('youtu.be/')) {
                        const videoId = tool.videoUrl.split('youtu.be/')[1].split('?')[0];
                        embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    } else if (tool.videoUrl.includes('youtube.com/watch')) {
                        const videoId = new URL(tool.videoUrl).searchParams.get('v');
                        embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    }
                    embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'enablejsapi=1&playsinline=1';

                    videoSection.innerHTML = `
                        <h4>🎥 Demo Video</h4>
                        <div class="video-container">
                            <iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" playsinline></iframe>
                        </div>
                    `;
                    // Insert the new video section at the top of the modal body
                    modalBody.insertBefore(videoSection, modalBody.firstChild);
                }

                // 4. Show the modal
                this.openModal(modal);
            }

            showCategoryModal(categoryInfo, categoryKey) {
                const modal = document.getElementById('categoryModal');
                const modalTitle = document.getElementById('categoryModalTitle');
                const modalDescription = document.getElementById('categoryModalDescription');
                const modalFeatures = document.getElementById('categoryModalFeatures');
                const modalBody = modal?.querySelector('.modal-body');

                if (modalTitle) modalTitle.textContent = categoryInfo.name;
                if (modalDescription) modalDescription.textContent = categoryInfo.description;

                if (modalFeatures) {
                    modalFeatures.innerHTML = '';
                    categoryInfo.features.forEach(feature => {
                        const li = document.createElement('li');
                        li.textContent = feature;
                        modalFeatures.appendChild(li);
                    });
                }
                
                // Clear previous dynamic content
                const existingVideoSection = modalBody?.querySelector('.video-demo-section');
                if (existingVideoSection) {
                    existingVideoSection.remove();
                }

                if (categoryInfo.videoUrl && modalBody) {
                    const videoSection = document.createElement('div');
                    videoSection.className = 'feature-section video-demo-section';

                    let embedUrl = categoryInfo.videoUrl;
                    if (categoryInfo.videoUrl.includes('youtu.be/')) {
                        const videoId = categoryInfo.videoUrl.split('youtu.be/')[1].split('?')[0];
                        embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    } else if (categoryInfo.videoUrl.includes('youtube.com/watch')) {
                        const videoId = new URL(categoryInfo.videoUrl).searchParams.get('v');
                        embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    }
                    embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'enablejsapi=1&playsinline=1';

                    videoSection.innerHTML = `
                        <h4>🎥 Category Overview Video</h4>
                        <div class="video-container">
                             <iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" playsinline></iframe>
                        </div>
                    `;

                    modalBody.insertBefore(videoSection, modalBody.firstChild);
                }

                this.openModal(modal);
            }

            closeModal(modalId) {
                const modal = document.getElementById(modalId);
                if (modal && modal.classList.contains('show')) {
                    modal.classList.remove('show');
                    document.body.classList.remove('modal-open');
                    
                    // Stop video from playing in the background
                    const iframe = modal.querySelector('iframe');
                    if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', 'https://www.youtube.com');
                    }

                    if (this.previousFocusedElement) {
                        this.previousFocusedElement.focus();
                        this.previousFocusedElement = null;
                    }
                }
            }

            filterAndDisplayTools() {
                let tools;

                if (this.searchTerm) {
                    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
                    tools = this.TREASURY_TOOLS.filter(tool => {
                        const searchableText = [
                            tool.name,
                            tool.desc,
                            tool.target,
                            ...(tool.tags || []),
                            ...(tool.features || [])
                        ].join(' ').toLowerCase();

                        return searchableText.includes(lowerCaseSearchTerm);
                    });
                } else {
                    tools = this.currentFilter === 'ALL' ?
                        this.TREASURY_TOOLS :
                        this.TREASURY_TOOLS.filter(tool => tool.category === this.currentFilter);
                }

                // Advanced Filters
                if (this.advancedFilters.features.length) {
                    tools = tools.filter(t => this.advancedFilters.features.every(f => (t.tags || []).includes(f)));
                }
                if (this.advancedFilters.hasVideo) {
                    tools = tools.filter(t => t.videoUrl);
                }

                // Sorting
                if (this.currentSort === 'name') {
                    tools = tools.sort((a, b) => a.name.localeCompare(b.name));
                } else if (this.currentSort === 'category') {
                    tools = tools.sort((a, b) => a.category.localeCompare(b.category));
                }

                this.filteredTools = tools;
                this.displayFilteredTools();
                this.updateVisibleCounts();
            }

            displayFilteredTools() {
                const categories = ['CASH', 'LITE', 'TRMS'];
                const hasResults = this.filteredTools.length > 0;

                const noResults = document.getElementById('noResults');
                if (noResults) noResults.style.display = hasResults ? 'none' : 'block';

                const listContainer = document.getElementById('listViewContainer');
                const ungroup = !this.groupByCategory || this.currentView === 'list' || this.searchTerm ||
                                this.advancedFilters.features.length || this.advancedFilters.hasVideo;

                if (ungroup) {
                    categories.forEach(cat => {
                        const section = document.querySelector(`.category-section[data-category="${cat}"]`);
                        if (section) section.style.display = 'none';
                    });
                    if (listContainer) {
                        listContainer.innerHTML = '';
                        this.filteredTools.sort((a,b) => a.name.localeCompare(b.name)).forEach(tool => {
                            const card = this.createToolCard(tool, tool.category);
                            listContainer.appendChild(card);
                        });
                        listContainer.style.display = hasResults ? 'grid' : 'none';
                    }
                    return;
                } else {
                    if (listContainer) listContainer.style.display = 'none';
                }

                categories.forEach(category => {
                    const section = document.querySelector(`.category-section[data-category="${category}"]`);
                    const container = document.getElementById(`tools-${category}`);
                    const categoryTools = this.filteredTools
                        .filter(tool => tool.category === category)
                        .sort((a, b) => a.name.localeCompare(b.name));

                    // Clear the container first
                    if (container) {
                        container.innerHTML = '';
                    }

                    // Determine if this section should be visible
                    let shouldShowSection = false;

                    if (this.searchTerm) {
                        // When searching, show section only if it has matching tools
                        shouldShowSection = categoryTools.length > 0;
                    } else {
                        // When filtering by category, show section if it matches filter and has tools
                        shouldShowSection = (this.currentFilter === 'ALL' || this.currentFilter === category) && categoryTools.length > 0;
                    }

                    // Show/hide the section
                    if (section) {
                        section.style.display = shouldShowSection ? 'block' : 'none';
                    }

                    // Populate the container only if section is visible
                    if (shouldShowSection && container) {
                        categoryTools.forEach(tool => {
                            const card = this.createToolCard(tool, category);
                            container.appendChild(card);
                        });
                    }
                });
            }

            createToolCard(tool, category) {
                const card = document.createElement('div');
                card.className = `tool-card tool-${category.toLowerCase()}`;
                card.draggable = !this.isMobile();
                card.dataset.name = tool.name;

                const iconMap = {
                    'TRMS': '🏢',
                    'CASH': '💰',
                    'LITE': '⚡'
                };

                const tags = tool.tags || this.CATEGORY_TAGS[tool.category] || [];
                const sortedTags = [...tags].sort((a, b) => a.localeCompare(b));
                const displayTags = sortedTags.slice(0, 3);
                const hasMoreTags = sortedTags.length > 3;

                card.innerHTML = `
                    <div class="tool-card-content">
                        <div class="tool-header">
                            <div class="tool-info">
                                <div class="tool-name">
                                    ${tool.name}
                                    ${tool.videoUrl ? '<span class="video-indicator">🎥</span>' : ''}
                                </div>
                                <div class="tool-type">${tool.category === 'CASH' ? 'Cash Tools' : tool.category === 'LITE' ? 'TMS-Lite' : tool.category}</div>
                            </div>
                            <div class="tool-meta">
                                ${tool.logoUrl ? `<img loading="lazy" class="tool-logo" src="${tool.logoUrl}" alt="${tool.name} logo">` : ""}
                                <div class="tool-icon">${iconMap[tool.category]}</div>
                            </div>
                        </div>
                        <div class="tool-description">${tool.desc}</div>
                    </div>
                    <div class="tool-card-actions">
                        <div class="tool-tags">
                            ${displayTags.map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
                            ${hasMoreTags ? `<button class="show-more-tags-btn" data-tool-name="${tool.name}">... more</button>` : ''}
                        </div>
                    </div>
                `;

                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.show-more-tags-btn') &&
                        !e.target.closest('.show-less-tags-btn')) {
                        this.showToolModal(tool);
                    }
                });

                if (!this.isMobile()) {
                    card.addEventListener('dragstart', (e) => {
                        e.dataTransfer.setData('text/plain', tool.name);
                        this.openShortlistMenu('dragstart');
                    });

                    card.addEventListener('touchstart', () => {
                        this.touchDragTool = tool;
                        this.openShortlistMenu();
                    });
                    card.addEventListener('touchmove', (e) => {
                        const container = document.getElementById('shortlistContainer');
                        if (!container) return;
                        const touch = e.touches[0];
                        const el = document.elementFromPoint(touch.clientX, touch.clientY);
                        if (el && container.contains(el)) {
                            container.classList.add('drag-over');
                        } else {
                            container.classList.remove('drag-over');
                        }
                        e.preventDefault();
                    }, { passive: false });
                    card.addEventListener('touchend', (e) => {
                        const container = document.getElementById('shortlistContainer');
                        if (container) {
                            container.classList.remove('drag-over');
                        }
                        if (this.touchDragTool && container) {
                            const touch = e.changedTouches[0];
                            const el = document.elementFromPoint(touch.clientX, touch.clientY);
                            if (el && container.contains(el) && !this.shortlist.some(i => i.tool.name === this.touchDragTool.name)) {
                                this.shortlist.push({ tool: this.touchDragTool, notes: '' });
                                this.renderShortlist();
                            }
                        }
                        this.touchDragTool = null;
                    });
                }

                return card;
            }

            populateCategoryTags() {
                const categories = ['CASH', 'LITE', 'TRMS'];
                categories.forEach(category => {
                    const container = document.getElementById(`category-tags-${category}`);
                    if (container) {
                        const tags = this.CATEGORY_TAGS[category] || [];
                        const sorted = [...tags].sort((a, b) => a.localeCompare(b));
                        const displayTags = sorted.slice(0, 3);
                        const hasMore = sorted.length > 3;
                        container.innerHTML = displayTags.map(tag => `<span class="category-tag">${tag}</span>`).join('');
                        if (hasMore) {
                            container.innerHTML += `<button class="show-more-category-tags-btn" data-category="${category}">... more</button>`;
                        }
                    }
                });
            }

            populateTagFilters() {
                const container = document.getElementById('tagFilters');
                if (!container) return;
                const tags = [...new Set(Object.values(this.CATEGORY_TAGS).flat())].sort((a, b) => a.localeCompare(b));
                this.allTags = tags;
                const displayCount = 4;
                const visible = tags.slice(0, displayCount);
                const hidden = tags.slice(displayCount);
                const makeCb = (tag) => {
                    const id = `tag-${tag.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
                    return `<div class="checkbox-item"><input type="checkbox" id="${id}" value="${tag}"><label for="${id}">${tag}</label></div>`;
                };
                container.innerHTML = visible.map(makeCb).join('');
                if (hidden.length) {
                    container.innerHTML += `<div id="extraTagFilters" style="display:none;">${hidden.map(makeCb).join('')}</div>`;
                    container.innerHTML += `<button class="show-more-filter-tags-btn" id="showMoreTagFilters">Show more</button>`;
                    container.innerHTML += `<button class="show-less-filter-tags-btn" id="showLessTagFilters" style="display:none;">Show less</button>`;
                }
            }

            updateVisibleCounts() {
                const categories = ['CASH', 'LITE', 'TRMS'];
                let visibleTotal = 0;
                categories.forEach(category => {
                    const count = this.filteredTools.filter(tool => tool.category === category).length;
                    const countElement = document.getElementById(`count-${category}`);
                    if (countElement) {
                        countElement.textContent = count;
                    }
                    visibleTotal += count;
                });

                const totalTools = document.getElementById('totalTools');
                if (totalTools) {
                    totalTools.textContent = this.searchTerm ? visibleTotal : this.TREASURY_TOOLS.length;
                }
            }

            updateCounts() {
                const categories = ['CASH', 'LITE', 'TRMS'];
                categories.forEach(category => {
                    const count = this.TREASURY_TOOLS.filter(tool => tool.category === category).length;
                    const countElement = document.getElementById(`count-${category}`);
                    if (countElement) {
                        countElement.textContent = count;
                    }
                });

                const totalTools = document.getElementById('totalTools');
                if (totalTools) {
                    totalTools.textContent = this.TREASURY_TOOLS.length;
                }
            }

            setupSideMenu() {

                const menuToggle = document.getElementById('sideMenuToggle');
                const externalMenuToggle = document.getElementById('externalMenuToggle');
                const sideMenu = document.getElementById('sideMenu');
                const overlay = document.getElementById('sideMenuOverlay');

                if (menuToggle) menuToggle.addEventListener('click', () => this.toggleSideMenu());
                if (externalMenuToggle) externalMenuToggle.addEventListener('click', () => this.toggleSideMenu());
                if (overlay) overlay.addEventListener('click', () => this.closeSideMenu());
                if (sideMenu) sideMenu.addEventListener('click', (e) => {
                    if (this.isMobile()) return;
                    if (!this.sideMenuOpen && e.target === sideMenu) {
                        e.stopPropagation();
                        this.openSideMenu();
                    }
                });

                this.setupAdvancedFilters();
                this.setupViewOptions();
                this.setupQuickActions();

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.sideMenuOpen) this.closeSideMenu();
                });
            }

            setupAdvancedFilters() {
                this.populateTagFilters();
                this.setupTagSearch();
                const showMore = document.getElementById('showMoreTagFilters');
                const showLess = document.getElementById('showLessTagFilters');
                const extra = document.getElementById('extraTagFilters');
                if (showMore && showLess && extra) {
                    showMore.addEventListener('click', () => {
                        extra.style.display = 'block';
                        showMore.style.display = 'none';
                        showLess.style.display = 'inline-block';
                    });
                    showLess.addEventListener('click', () => {
                        extra.style.display = 'none';
                        showLess.style.display = 'none';
                        showMore.style.display = 'inline-block';
                    });
                }

                const featureCheckboxes = document.querySelectorAll('#tagFilters input[type="checkbox"]');
                featureCheckboxes.forEach(cb => {
                    cb.addEventListener('change', () => {
                        this.updateFeatureFilters();
                        this.filterAndDisplayTools();
                        this.updateFilterCount();
                    });
                });

                const hasVideoFilter = document.getElementById('hasVideoFilter');
                if (hasVideoFilter) {
                    hasVideoFilter.addEventListener('change', (e) => {
                        this.advancedFilters.hasVideo = e.target.checked;
                        this.filterAndDisplayTools();
                        this.updateFilterCount();
                    });
                }

                const sortFilter = document.getElementById('sortFilter');
                if (sortFilter) {
                    sortFilter.addEventListener('change', (e) => {
                        this.currentSort = e.target.value;
                        this.filterAndDisplayTools();
                    });
                }
            }

            setupViewOptions() {
                const viewOptions = document.querySelectorAll('.view-option');
                viewOptions.forEach(opt => {
                    opt.addEventListener('click', () => {
                        viewOptions.forEach(o => o.classList.remove('active'));
                        opt.classList.add('active');
                        this.currentView = opt.dataset.view;
                        this.applyViewStyles();
                    });
                });

                const groupByFilter = document.getElementById('groupByFilter');
                if (groupByFilter) {
                    groupByFilter.addEventListener('change', (e) => {
                        this.groupByCategory = e.target.value === 'category';
                        this.filterAndDisplayTools();
                    });
                }
            }

            setupQuickActions() {
                const clearAll = document.getElementById('clearAllFilters');
                if (clearAll) clearAll.addEventListener('click', () => this.clearAllFilters());

                const resetBtn = document.getElementById('resetToDefaults');
                if (resetBtn) resetBtn.addEventListener('click', () => this.resetToDefaults());

                const applyBtn = document.getElementById('applyFilters');
                if (applyBtn) applyBtn.addEventListener('click', () => {
                    this.filterAndDisplayTools();
                    this.closeSideMenu();
                });
            }

            toggleSideMenu() {
                if (this.sideMenuOpen) this.closeSideMenu();
                else this.openSideMenu();
            }

            openSideMenu() {
                this.closeShortlistMenu();
                const sideMenu = document.getElementById('sideMenu');
                const overlay = document.getElementById('sideMenuOverlay');
                const toggle = document.getElementById('sideMenuToggle');
                const externalToggle = document.getElementById('externalMenuToggle');

                sideMenu?.classList.add('open');
                document.body.classList.add('side-menu-open');
                overlay?.classList.add('show');
                toggle?.classList.add('active');
                externalToggle?.classList.add('active');
                document.body.style.overflow = 'hidden';
                document.addEventListener('click', this.handleOutsideSideMenuClick, true);
                this.sideMenuOpen = true;
            }

            closeSideMenu() {
                const sideMenu = document.getElementById('sideMenu');
                const overlay = document.getElementById('sideMenuOverlay');
                const toggle = document.getElementById('sideMenuToggle');
                const externalToggle = document.getElementById('externalMenuToggle');

                sideMenu?.classList.remove('open');
                overlay?.classList.remove('show');
                toggle?.classList.remove('active');
                externalToggle?.classList.remove('active');
                document.body.classList.remove('side-menu-open');
                document.body.style.overflow = '';
                document.removeEventListener('click', this.handleOutsideSideMenuClick, true);
                this.sideMenuOpen = false;
            }

            setupShortlistMenu() {

                const menuToggle = document.getElementById('shortlistMenuToggle');
                const overlay = document.getElementById('shortlistMenuOverlay');
                const externalToggle = document.getElementById('externalShortlistToggle');
                const container = document.getElementById('shortlistContainer');
                const clearBtn = document.getElementById('clearShortlist');
                const exportBtn = document.getElementById('exportShortlistBtn');

                if (menuToggle) menuToggle.addEventListener('click', () => this.toggleShortlistMenu());
                if (externalToggle) externalToggle.addEventListener('click', () => this.toggleShortlistMenu());
                if (overlay) {
                    overlay.addEventListener('dragover', e => e.preventDefault());
                    overlay.addEventListener('drop', e => e.preventDefault());
                }
                const shortlistMenu = document.getElementById('shortlistMenu');
                if (shortlistMenu) shortlistMenu.addEventListener('click', (e) => {
                    if (this.isMobile()) return;
                    if (!this.shortlistMenuOpen && e.target === shortlistMenu) {
                        e.stopPropagation();
                        this.openShortlistMenu();
                    }
                });
                if (clearBtn) clearBtn.addEventListener('click', () => this.clearShortlist());
                if (exportBtn) exportBtn.addEventListener('click', () => this.exportShortlist());

                if (container) {
                    let draggedCard = null;
                    let touchDraggedCard = null;
                    const addHighlight = () => container.classList.add('drag-over');
                    const removeHighlight = () => container.classList.remove('drag-over');

                    container.addEventListener('dragstart', e => {
                        if (e.target.classList.contains('shortlist-card')) {
                            draggedCard = e.target;
                            e.dataTransfer.setData('text/plain', e.target.dataset.name);
                            e.dataTransfer.effectAllowed = 'move';
                        } else {
                            draggedCard = null;
                        }
                    });

                    container.addEventListener('dragenter', addHighlight);
                    container.addEventListener('dragleave', e => {
                        if (e.target === container) removeHighlight();
                    });
                    container.addEventListener('dragover', e => {
                        e.preventDefault();
                        if (draggedCard) {
                            const target = e.target.closest('.shortlist-card');
                            if (target && target !== draggedCard) {
                                const rect = target.getBoundingClientRect();
                                const next = (e.clientY - rect.top) > rect.height / 2;
                                container.insertBefore(draggedCard, next ? target.nextSibling : target);
                            }
                        }
                    });
                    container.addEventListener('drop', e => {
                        e.preventDefault();
                        removeHighlight();
                        if (draggedCard) {
                            this.shortlist = Array.from(container.querySelectorAll('.shortlist-card')).map(card => {
                                const name = card.dataset.name;
                                return this.shortlist.find(i => i.tool.name === name);
                            });
                            draggedCard = null;
                            this.renderShortlist();
                        } else {
                            const name = e.dataTransfer.getData('text/plain');
                            const tool = this.TREASURY_TOOLS.find(t => t.name === name);
                            if (tool && !this.shortlist.some(i => i.tool.name === name)) {
                                this.shortlist.push({ tool, notes: '' });
                                this.renderShortlist();
                            }
                        }
                    });

                    container.addEventListener('touchstart', e => {
                        const card = e.target.closest('.shortlist-card');
                        if (card) {
                            touchDraggedCard = card;
                            addHighlight();
                        }
                    });
                    container.addEventListener('touchmove', e => {
                        if (!touchDraggedCard) return;
                        const touch = e.touches[0];
                        const target = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.shortlist-card');
                        if (target && target !== touchDraggedCard) {
                            const rect = target.getBoundingClientRect();
                            const next = (touch.clientY - rect.top) > rect.height / 2;
                            container.insertBefore(touchDraggedCard, next ? target.nextSibling : target);
                        }
                        e.preventDefault();
                    }, { passive: false });
                    container.addEventListener('touchend', () => {
                        if (!touchDraggedCard) return;
                        removeHighlight();
                        this.shortlist = Array.from(container.querySelectorAll('.shortlist-card')).map(card => {
                            const name = card.dataset.name;
                            return this.shortlist.find(i => i.tool.name === name);
                        });
                        touchDraggedCard = null;
                        this.renderShortlist();
                    });

                    container.addEventListener('click', e => {
                        if (e.target === container && !container.querySelector('#toolPicker')) {
                            this.openToolPicker();
                        }
                    });
                }

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.shortlistMenuOpen) this.closeShortlistMenu();
                });

                this.renderShortlist();
            }

            toggleShortlistMenu() {
                if (this.shortlistMenuOpen) this.closeShortlistMenu();
                else this.openShortlistMenu();
            }

            openShortlistMenu(trigger) {
                this.closeSideMenu();
                const menu = document.getElementById('shortlistMenu');
                const overlay = document.getElementById('shortlistMenuOverlay');
                const toggle = document.getElementById('shortlistMenuToggle');
                const externalToggle = document.getElementById('externalShortlistToggle');

                menu?.classList.add('open');
                document.body.classList.add('shortlist-menu-open');
                overlay?.classList.add('show');
                document.addEventListener('click', this.handleOutsideShortlistMenuClick);
               toggle?.classList.add('active');
               externalToggle?.classList.add('active');
               document.body.style.overflow = 'hidden';
               this.shortlistMenuOpen = true;
            }

            closeShortlistMenu() {
                const menu = document.getElementById('shortlistMenu');
                const overlay = document.getElementById('shortlistMenuOverlay');
                const toggle = document.getElementById('shortlistMenuToggle');
                const externalToggle = document.getElementById('externalShortlistToggle');

                menu?.classList.remove('open');
                document.body.classList.remove('shortlist-menu-open');
                overlay?.classList.remove('show');
                document.removeEventListener('click', this.handleOutsideShortlistMenuClick);
               toggle?.classList.remove('active');
               externalToggle?.classList.remove('active');
               document.body.style.overflow = '';
               this.shortlistMenuOpen = false;
            }

            renderShortlist() {
                const container = document.getElementById('shortlistContainer');
                const emptyMsg = document.getElementById('shortlistEmptyMessage');
                if (!container) return;

                container.innerHTML = '';

                if (emptyMsg) container.appendChild(emptyMsg);

                if (this.shortlist.length === 0) {
                    container.classList.add('empty');
                    if (emptyMsg) emptyMsg.classList.remove('visually-hidden');
                } else {
                    container.classList.remove('empty');
                    if (emptyMsg) emptyMsg.classList.add('visually-hidden');

                    this.shortlist.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'shortlist-card';
                        div.draggable = true;
                        div.dataset.name = item.tool.name;
                        div.innerHTML = `
                            <div class="shortlist-card-header">
                                <div class="shortlist-card-title-wrapper">
                                    <span class="shortlist-card-title">${item.tool.name}</span>
                                    ${item.tool.websiteUrl ? `<a class="shortlist-card-link" href="${item.tool.websiteUrl}" target="_blank" rel="noopener noreferrer" title="Visit website">↗</a>` : ''}
                                </div>
                                <div class="shortlist-card-buttons">
                                    <button class="move-up" data-name="${item.tool.name}" aria-label="Move up">▲</button>
                                    <button class="move-down" data-name="${item.tool.name}" aria-label="Move down">▼</button>
                                    <button class="remove-shortlist" data-name="${item.tool.name}" aria-label="Remove">×</button>
                                </div>
                            </div>
                            <textarea class="shortlist-note" data-name="${item.tool.name}" placeholder="Notes...">${item.notes || ''}</textarea>`;
                        container.appendChild(div);
                    });
                }
                container.querySelectorAll('.remove-shortlist').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const name = e.target.dataset.name;
                        this.shortlist = this.shortlist.filter(i => i.tool.name !== name);
                        this.renderShortlist();
                    });
                });
                container.querySelectorAll('.move-up').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const name = e.target.dataset.name;
                        const idx = this.shortlist.findIndex(i => i.tool.name === name);
                        if (idx > 0) {
                            const [item] = this.shortlist.splice(idx, 1);
                            this.shortlist.splice(idx - 1, 0, item);
                            this.renderShortlist();
                        }
                    });
                });
                container.querySelectorAll('.move-down').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const name = e.target.dataset.name;
                        const idx = this.shortlist.findIndex(i => i.tool.name === name);
                        if (idx < this.shortlist.length - 1 && idx !== -1) {
                            const [item] = this.shortlist.splice(idx, 1);
                            this.shortlist.splice(idx + 1, 0, item);
                            this.renderShortlist();
                        }
                    });
                });
                container.querySelectorAll('.shortlist-note').forEach(area => {
                    area.addEventListener('input', (e) => {
                        const name = e.target.dataset.name;
                        const item = this.shortlist.find(i => i.tool.name === name);
                        if (item) item.notes = e.target.value;
                    });
                });

                const exportBtn = document.getElementById('exportShortlistBtn');
                if (exportBtn) {
                    exportBtn.disabled = this.shortlist.length === 0;
                }
            }

            clearShortlist() {
                this.shortlist = [];
                this.renderShortlist();
            }

            openToolPicker() {
                const container = document.getElementById('shortlistContainer');
                if (!container) return;
                const existing = document.getElementById('toolPicker');
                if (existing) existing.remove();
                const select = document.createElement('select');
                select.id = 'toolPicker';
                select.innerHTML = '<option value="" disabled selected>Select a tool</option>' +
                    this.TREASURY_TOOLS.filter(t => !this.shortlist.some(i => i.tool.name === t.name))
                        .map(t => `<option value="${t.name}">${t.name}</option>`).join('');
                select.addEventListener('change', () => {
                    const name = select.value;
                    const tool = this.TREASURY_TOOLS.find(t => t.name === name);
                    if (tool && !this.shortlist.some(i => i.tool.name === name)) {
                        this.shortlist.push({ tool, notes: '' });
                        this.renderShortlist();
                    }
                    select.remove();
                });
                container.appendChild(select);
                select.focus();
            }

            setupBottomNav() {
                const search = document.getElementById('bottomSearch');
                const shortlist = document.getElementById('bottomShortlist');

                if (search) {
                    search.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        if (this.sideMenuOpen) {
                            this.closeSideMenu();
                        } else {
                            this.openSideMenu();

                            // Add delay to ensure menu animation completes
                            setTimeout(() => {
                                const input = document.getElementById('searchInput');
                                if (input) {
                                    input.focus();
                                    // For iOS Safari - trigger click as well
                                    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                                        input.click();
                                    }
                                }
                            }, 350); // Match the menu transition duration
                        }
                    });
                }

                if (shortlist) {
                    let startX, startY;
                    shortlist.addEventListener('touchstart', e => {
                        startX = e.touches[0].clientX;
                        startY = e.touches[0].clientY;
                    });
                    shortlist.addEventListener('touchend', e => {
                        const dx = Math.abs(e.changedTouches[0].clientX - startX);
                        const dy = Math.abs(e.changedTouches[0].clientY - startY);
                        if (dx < 10 && dy < 10) {
                            e.preventDefault();
                            this.toggleShortlistMenu();
                        }
                    });
                    shortlist.addEventListener('click', () => this.toggleShortlistMenu());
                }
            }


            updateFeatureFilters() {
                const cbs = document.querySelectorAll('#tagFilters input[type="checkbox"]');
                this.advancedFilters.features = Array.from(cbs).filter(cb => cb.checked).map(cb => cb.value);
            }

            applyViewStyles() {
                const grids = document.querySelectorAll('.tools-grid');
                grids.forEach(grid => {
                    grid.classList.remove('list-view');
                    if (this.currentView === 'list') {
                        grid.classList.add('list-view');
                        grid.style.gridTemplateColumns = '1fr';
                    } else {
                        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
                    }
                });
            }

            exportShortlist() {
                const data = this.shortlist.map(item => ({
                    name: item.tool.name,
                    category: item.tool.category,
                    website: item.tool.websiteUrl ? item.tool.websiteUrl.split('?')[0] : '',
                    notes: item.notes || ''
                }));
                const csv = this.convertToCSV(data);
                this.downloadCSV(csv, 'shortlist.csv');
            }

            convertToCSV(data) {
                if (!data.length) return '';
                const headers = Object.keys(data[0]);
                return [
                    headers.join(','),
                    ...data.map(row => headers.map(h => `"${String(row[h]).replace(/"/g,'""')}"`).join(','))
                ].join('\n');
            }

            downloadCSV(csv, filename) {
                const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
                const link = document.createElement('a');
                if (link.download !== undefined) {
                    const url = URL.createObjectURL(blob);
                    link.setAttribute('href', url);
                    link.setAttribute('download', filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                }
            }

            clearAllFilters() {
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.value = '';
                    this.searchTerm = '';
                }
                const tagSearchInput = document.getElementById('tagSearchInput');
                if (tagSearchInput) {
                    tagSearchInput.value = '';
                }
                const tagSearchClear = document.getElementById('tagSearchClear');
                if (tagSearchClear) tagSearchClear.style.display = 'none';
                this.filterTagCheckboxes('');
                document.querySelector('.filter-tab.active')?.classList.remove('active');
                document.querySelector('.filter-tab[data-category="ALL"]')?.classList.add('active');
                this.currentFilter = 'ALL';

                this.advancedFilters = { features:[], hasVideo:false };

                const checkboxes = document.querySelectorAll('#tagFilters input[type="checkbox"],#hasVideoFilter');
                checkboxes.forEach(cb => cb.checked = false);

                this.filterAndDisplayTools();
                this.updateFilterCount();
            }

            resetToDefaults() {
                this.clearAllFilters();
                const sortFilter = document.getElementById('sortFilter');
                if (sortFilter) sortFilter.value = 'name';
                this.currentSort = 'name';

                document.querySelectorAll('.view-option').forEach(opt => opt.classList.remove('active'));
                document.querySelector('.view-option[data-view="grid"]')?.classList.add('active');
                this.currentView = 'grid';

                const groupByFilter = document.getElementById('groupByFilter');
                if (groupByFilter) groupByFilter.value = 'category';
                this.groupByCategory = true;

                this.applyViewStyles();
                this.filterAndDisplayTools();
            }

            updateFilterCount() {
                const { features, hasVideo } = this.advancedFilters;
                let count = 0;
                count += features.length;
                if (hasVideo) count++;
                const el = document.getElementById('filterCount');
                if (el) el.textContent = count > 0 ? `(${count})` : '';
            }
        }

        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, {
            passive: false
        });
