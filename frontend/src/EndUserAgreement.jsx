import {useState, useEffect} from 'react';
import {Link, useSearchParams} from 'react-router-dom';

function EndUserAgreement () {
    return (
        <div>
            <div>
              <h1>Privacy Policy</h1>
              <p>Effective Date: 06/07/2025</p>
        
              <p>
                This application ("App") is developed and maintained by HouseMedix, LLC for internal use with QuickBooks Online.
              </p>
        
              <h2>Information We Collect</h2>
              <p>
                The App may collect basic company and transaction data from your QuickBooks Online account through authorized access, solely for the purpose of generating invoices and managing accounting tasks.
              </p>
        
              <h2>How We Use Information</h2>
              <p>
                Data accessed via QuickBooks is used exclusively to interact with your own QuickBooks account. We do not store, share, or sell any data obtained through the API.
              </p>
        
              <h2>Third-Party Sharing</h2>
              <p>
                We do not share your data with any third parties. All processing is local or restricted to direct API communication with QuickBooks Online.
              </p>
        
              <h2>Your Consent</h2>
              <p>By using this App, you consent to this privacy policy.</p>
        
              <h2>Contact</h2>
              <p>If you have questions, contact us at [your email address].</p>
            </div>

<div>
<h1>End User License Agreement (EULA)</h1>
<p>Effective Date: 06/07/2025</p>

<p>
  This EULA is a legal agreement between you and [Your Name or Company Name] regarding the use of the internal-use application ("App") that integrates with QuickBooks Online.
</p>

<h2>License</h2>
<p>
  You are granted a non-transferable, non-exclusive license to use the App solely for your internal business purposes.
</p>

<h2>Restrictions</h2>
<ul>
  <li>You may not redistribute, resell, or sublicense the App to third parties.</li>
  <li>You may not reverse engineer or decompile the App.</li>
</ul>

<h2>Data Usage</h2>
<p>
  The App only accesses your QuickBooks account data via authorized means and does not transmit or store this data externally.
</p>

<h2>Termination</h2>
<p>
  This license is effective until terminated. You may terminate it at any time. It will also terminate if you fail to comply with any terms.
</p>

<h2>Disclaimer</h2>
<p>
  The App is provided "as is" without warranty of any kind. We are not liable for any damages or losses resulting from the use of the App.
</p>

<h2>Contact</h2>
<p>Questions about this agreement? Contact [your email address].</p>
</div>

</div>
    );
};

export default EndUserAgreement;