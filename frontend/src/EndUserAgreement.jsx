/**
 * End User License Agreement and Privacy Policy page
 *
 * Public legal reference document, required for the QuickBooks integration.
 * Deliberately styled apart from the admin dashboard — see EndUserAgreement.css.
 */

import { Link } from 'react-router-dom';
import './EndUserAgreement.css';

function EndUserAgreement() {
    return (
        <div className="legal-page">

            <div className="legal-page-nav">
                <div className="legal-back-links">
                    <Link to="/clientDashboard" className="legal-back-link">← Client Dashboard</Link>
                    <Link to="/activityDashboard" className="legal-back-link">← Activity Dashboard</Link>
                </div>
                <nav className="legal-toc">
                    <a href="#privacy-policy">Privacy Policy</a>
                    <a href="#eula">License Agreement</a>
                </nav>
            </div>

            <div className="legal-container">

                <div className="legal-header">
                    <h1>HouseMedix Legal Documents</h1>
                    <p>
                        Privacy Policy and End User License Agreement for the HouseMedix
                        internal application and its QuickBooks Online integration.
                    </p>
                </div>

                <section id="privacy-policy" className="legal-section">
                    <h2 className="legal-title">Privacy Policy</h2>
                    <p className="legal-effective-date">Effective Date: June 7, 2025</p>

                    <p>
                        This application ("App") is developed and maintained by HouseMedix, LLC for internal use with QuickBooks Online.
                    </p>

                    <h3>Information We Collect</h3>
                    <p>
                        The App may collect basic company and transaction data from your QuickBooks Online account through authorized access, solely for the purpose of generating invoices and managing accounting tasks.
                    </p>

                    <h3>How We Use Information</h3>
                    <p>
                        Data accessed via QuickBooks is used exclusively to interact with your own QuickBooks account. We do not store, share, or sell any data obtained through the API.
                    </p>

                    <h3>Third-Party Sharing</h3>
                    <p>
                        We do not share your data with any third parties. All processing is local or restricted to direct API communication with QuickBooks Online.
                    </p>

                    <h3>Your Consent</h3>
                    <p>By using this App, you consent to this privacy policy.</p>

                    <h3>Contact</h3>
                    <p>If you have questions, contact us at [your email address].</p>
                </section>

                <section id="eula" className="legal-section">
                    <h2 className="legal-title">End User License Agreement (EULA)</h2>
                    <p className="legal-effective-date">Effective Date: June 7, 2025</p>

                    <p>
                        This EULA is a legal agreement between you and [Your Name or Company Name] regarding the use of the internal-use application ("App") that integrates with QuickBooks Online.
                    </p>

                    <h3>License</h3>
                    <p>
                        You are granted a non-transferable, non-exclusive license to use the App solely for your internal business purposes.
                    </p>

                    <h3>Restrictions</h3>
                    <ul>
                        <li>You may not redistribute, resell, or sublicense the App to third parties.</li>
                        <li>You may not reverse engineer or decompile the App.</li>
                    </ul>

                    <h3>Data Usage</h3>
                    <p>
                        The App only accesses your QuickBooks account data via authorized means and does not transmit or store this data externally.
                    </p>

                    <h3>Termination</h3>
                    <p>
                        This license is effective until terminated. You may terminate it at any time. It will also terminate if you fail to comply with any terms.
                    </p>

                    <h3>Disclaimer</h3>
                    <p>
                        The App is provided "as is" without warranty of any kind. We are not liable for any damages or losses resulting from the use of the App.
                    </p>

                    <h3>Contact</h3>
                    <p>Questions about this agreement? Contact [your email address].</p>
                </section>

            </div>
        </div>
    );
};

export default EndUserAgreement;
