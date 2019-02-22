import { Icon } from "antd";
import React from "react";

function UpgradePage() {
  return (
    <div className="upgrade-wrapper">
      <div className="border">
        <div className="basic-header">
          <h2 className="upgrade-header">BASIC</h2>
        </div>
        <div className="plan">
          <div className="top-right">
            <li className="price">
              <span className="monthly">FREE</span>
            </li>
          </div>

          <h3>
            <Icon type="cloud-upload" className="font-style-upgrade" />
            limited uploads & downloads
          </h3>
          <h3>
            <Icon type="cloud" className="font-style-upgrade" />
            150 MB cloudspace
          </h3>
          <h3>
            <Icon type="api" className="font-style-upgrade" />
            limited access per day
          </h3>
        </div>
      </div>
      <div className="border">
        <div className="pro-header">
          <h2 className="upgrade-header">PRO</h2>
        </div>
        <div className="plan">
          <div className="top-right">
            <li className="billed-annualy">Billed monthly</li>
            <li className="price">
              <span className="monthly">Rs.500</span>
            </li>
            <li className="mo-txt">/mon</li>
          </div>
          <h3>
            <Icon type="cloud-upload" className="font-style-upgrade" />
            unlimited uploads & downloads
          </h3>
          <h3>
            <Icon type="cloud" className="font-style-upgrade" />1 GB cloudspace
          </h3>
          <h3>
            <Icon type="api" className="font-style-upgrade" />
            unlimited access per day
          </h3>
        </div>
      </div>
      <div className="border">
        <div className="premium-header">
          <h2 className="upgrade-header">PREMIUM</h2>
        </div>
        <div className="plan">
          <div className="top-right">
            <li className="billed-annualy">Billed monthly</li>
            <li className="price">
              <span className="monthly">Rs.1500</span>
            </li>
            <li className="mo-txt">/mo</li>
          </div>
          <h3>
            <Icon type="cloud-upload" className="font-style-upgrade" />
            unlimited uploads & downloads
          </h3>
          <h3>
            <Icon type="cloud" className="font-style-upgrade" />5 GB cloudspace
          </h3>
          <h3>
            <Icon type="api" className="font-style-upgrade" />
            unlimited access per day
          </h3>
          <h3>
            <Icon type="thunderbolt" className="font-style-upgrade" />
            Faster access
          </h3>
        </div>
      </div>
    </div>
  );
}

export default UpgradePage;
