import './style/css/Privacy.css';
import digiboard_logo from "./style/img/Digiboard Title.png"

function Privacy() {
  const reloadRoot = () => {
    window.location.href='/';
  }

  return (
    <>
      <div className="header">
        <img src={digiboard_logo} onClick={reloadRoot} style={{ cursor: "pointer" }} title="Home" className="header_logo" width="200px" height="50px" alt="Digiboard Icon"></img>
      </div>
      <div className="pcontainer" style={{ width: "80%", paddingBottom: "5%", paddingLeft: "10%", paddingTop: "50px" }}>
        <p style={{ fontSize: "50px" }}>Privacy Policy</p>
        <p style={{ fontSize: "25px" }}>Last updated June 24, 2025</p>
        <p style={{ fontSize: "18px" }}>This Privacy Notice for Elijah Wood ('we', 'us', or 'our'), describes how and why we might access, collect, store, use, and/or share ('process') your personal information when you use our services ('Services'), including when you:</p>
        <ul>
          <li style={{ fontSize: "18px" }}>Visit our website at digiboard.cloud or any website of ours that links to this Privacy Notice.</li>
          <li style={{ fontSize: "18px" }}>Engage with us in other related ways, including any sales, marketing, or events.</li>
        </ul>
        <p style={{ fontSize: "18px" }}>
          <b>Questions or concerns?</b> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:itselijahwood@gmail.com">itselijahwood@gmail.com</a>.    
        </p>
        <p style={{ fontSize: "25px" }}>
          WHAT INFORMATION DO WE COLLECT?
        </p>
        <p style={{ fontSize: "20px" }}>
          Personal information you disclose to us
        </p>
        <p style={{ fontSize: "18px" }}>
          In Short: We collect personal information that you provide to us.
        </p>
        <p style={{ fontSize: "18px" }}>
          We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
        </p>
        <p style={{ fontSize: "18px" }}>
          Personal Information Provided by You. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
        </p>
        <ul>
          <li style={{ fontSize: "18px" }}>email addresses</li>
          <li style={{ fontSize: "18px" }}>names</li>
          <li style={{ fontSize: "18px" }}>usernames</li>
          <li style={{ fontSize: "18px" }}>passwords</li>
        </ul>
        <p style={{ fontSize: "18px" }}>
          Sensitive Information. We do not process sensitive information.
        </p>
        <p style={{ fontSize: "18px" }}>
          Application Data. If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:
        </p>
        <ul>
          <li style={{ fontSize: "18px" }}>
            Push Notifications. We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device's settings.
          </li>
        </ul>
        <p style={{ fontSize: "18px" }}>
          This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.
        </p>
        <p style={{ fontSize: "18px" }}>
          All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
        </p>
        <p style={{ fontSize: "25px" }}>
          HOW DO WE PROCESS YOUR INFORMATION?
        </p>
        <p style={{ fontSize: "18px" }}>
          In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We process the personal information for the following purposes listed below. We may also process your information for other purposes only with your prior explicit consent.
        </p>
        <p style={{ fontSize: "18px" }}>
          We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
        </p>
        <ul>
          <li style={{ fontSize: "18px" }}>To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
          <li style={{ fontSize: "18px" }}>To deliver and facilitate delivery of services to the user. We may process your information to provide you with the requested service.</li>
          <li style={{ fontSize: "18px" }}>To respond to user inquiries/offer support to users. We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
          <li style={{ fontSize: "18px" }}>To send administrative information to you. We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</li>
          <li style={{ fontSize: "18px" }}>To fulfil and manage your orders. We may process your information to fulfil and manage your orders, payments, returns, and exchanges made through the Services.</li> 
          <li style={{ fontSize: "18px" }}>To save or protect an individual's vital interest. We may process your information when necessary to save or protect an individual's vital interest, such as to prevent harm.</li> 
        </ul>
        <p style={{ fontSize: "25px" }}>
          HOW DO WE KEEP YOUR INFORMATION SAFE?
        </p>
        <p style={{ fontSize: "18px" }}>
          In Short: We aim to protect your personal information through a system of organisational and technical security measures.
        </p>
        <p style={{ fontSize: "18px" }}>
          We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
        </p>
        <p style={{ fontSize: "25px" }}>
          HOW LONG DO WE KEEP YOUR INFORMATION?
        </p>
        <p style={{ fontSize: "18px" }}>
          In Short: We keep your information for as long as necessary to fulfil the purposes outlined in this Privacy Notice unless otherwise required by law.
        </p>
        <p style={{ fontSize: "18px" }}>
          We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.
        </p>
        <p style={{ fontSize: "18px" }}>
          When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
        </p>
        <p style={{ fontSize: "25px" }}>
          WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </p>
        <p style={{ fontSize: "18px" }}>
          In Short: We may share information in specific situations described in this section and/or with the following third parties.
        </p>
        <p style={{ fontSize: "18px" }}>
          We may need to share your personal information in the following situations:
        </p>
        <ul>
          <li style={{ fontSize: "18px" }}>Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
        </ul>
        <p style={{ fontSize: "25px" }}>
          DO WE COLLECT INFORMATION FROM MINORS?
        </p>
        <p style={{ fontSize: "18px" }}>
          In Short: We do not knowingly collect data from or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction.
        </p>
        <p style={{ fontSize: "18px" }}>
          We do not knowingly collect, solicit data from, or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or the equivalent age as specified by law in your jurisdiction or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age or the equivalent age as specified by law in your jurisdiction has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18 or the equivalent age as specified by law in your jurisdiction, please contact us at <a href="mailto:itselijahwood@gmail.com">itselijahwood@gmail.com</a>.
        </p>
        <p style={{ fontSize: "25px" }}>HOW CAN YOU CONTACT US?</p>
        <p>If you have questions or comments about this notice, you may email us at <a href="mailto:itselijahwood@gmail.com">itselijahwood@gmail.com</a>.</p>
      </div>
      <div className="footer" style={{ opacity: "0.9" }}>
        <div style={{ width: "80%", paddingLeft: "10%", display: "flex", gap: "55px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <p style={{ fontSize: "15px", color: "#fff" }}>LEGAL</p>
            <a style={{ fontSize: "14px", textDecoration: "none", color: "#fff" }} href="/privacy">Privacy Policy</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <p style={{ fontSize: "15px", color: "#fff" }}>CONTACT US</p>
            <a style={{ fontSize: "14px", textDecoration: "none", color: "#fff" }} href="mailto:sales@digiboard.cloud">sales@digiboard.cloud</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Privacy;
