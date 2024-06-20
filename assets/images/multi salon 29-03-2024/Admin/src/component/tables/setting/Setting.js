// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Button from "../../extras/Button";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../extras/Title";
import {
  getSetting,
  handleSetting,
  maintenanceMode,
  updateSetting,
} from "../../../redux/slice/settingSlice";
import Input from "../../extras/Input";
import { editData, submitData } from "../../utils/fuction";
import ToggleSwitch from "../../extras/ToggleSwitch";


const Setting = (props) => {
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  

  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);

  useEffect(() => editData(setting), [setting]);

  const onsubmit = async (e) => {
    e.preventDefault();
    
    const subData = submitData(e);
    try {
      if (subData) {
        const payload = { data: subData, id: setting._id };
        await dispatch(updateSetting(payload)).unwrap();
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleSettingSwitch = (id, type) => {
    
    const payload = {
      id,
      type,
    };
    dispatch(handleSetting(payload));
  };

  const handleAppActive = (id) => {
    
    dispatch(maintenanceMode(id));
  };

  return (
    <div className="mainSetting">
      <Title name="Setting" />
      <div className="settingBox">
        <form onSubmit={onsubmit} id="expertForm">
          <div className=" d-flex justify-content-end">
            <div className="  formFooter">
              <Button
                type={`submit`}
                className={`text-light m10-left fw-bold`}
                text={`Submit`}
                style={{ backgroundColor: "#1ebc1e" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 mt-3">
              <div className="settingBoxOuter">
                <div className="settingBoxHeader d-flex justify-content-between">
                  <h4>App Setting</h4>
                  <div className="inputData">
                    <label className="me-2">Maintenance Mode</label>
                    <ToggleSwitch
                      onClick={() => handleAppActive(setting?._id)}
                      value={setting?.maintenanceMode}
                    />
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-between">
                  <Input
                    type={`text`}
                    id={`privacyPolicy`}
                    name={`privacyPolicyLink`}
                    label={`Privacy Policy Link`}
                    placeholder={`Privacy Policy Link`}
                    errorMessage={`Enter Privacy Policy Link`}
                  />
                </div>
                <div className="col-12">
                  <Input
                    type={`text`}
                    id={`TNC`}
                    name={`tnc`}
                    label={` Terms And Condition`}
                    placeholder={` Terms And Condition`}
                    errorMessage={`Enter  Terms And Condition`}
                  />
                </div>
                <div className="col-12 ">
                  <Input
                    type={`text`}
                    id={`tax`}
                    name={`tax`}
                    label={`Tax (%)`}
                    placeholder={`Tax`}
                    errorMessage={`Enter Tax`}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 mt-3 ">
              <div className="settingBoxOuter">
                <div className="settingBoxHeader">
                  <h4>Razor Pay Setting</h4>
                </div>
                <div className="col-12 ">
                  <Input
                    type={`text`}
                    id={`razorSecretKey`}
                    name={`razorSecretKey`}
                    label={`Razorpay Secret Key`}
                    placeholder={`Razorpay Secret Key`}
                    errorMessage={`Enter Razorpay Secret Key`}
                  />
                </div>
                <div className="col-12">
                  <Input
                    type={`text`}
                    id={`razorPayId`}
                    name={`razorPayId`}
                    label={` RazorPay Id`}
                    placeholder={` RazorPay Id`}
                    errorMessage={`Enter RazorPay Id`}
                  />
                </div>
                <div className="inputData">
                  <div>
                    <label className="my-3">Razor Pay Active</label>
                  </div>
                  <ToggleSwitch
                    onClick={() => handleSettingSwitch(setting?._id, 1)}
                    value={setting?.isRazorPay}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 mt-3 ">
              <div className="settingBoxOuter">
                <div className="settingBoxHeader">
                  <h4>Stripe Pay Setting</h4>
                </div>
                <div className="col-12 ">
                  <Input
                    type={`text`}
                    id={`stripePublishableKey`}
                    name={`stripePublishableKey`}
                    label={`Stripe Publishable Key`}
                    placeholder={`Stripe Publishable Key`}
                    errorMessage={`Enter Stripe Publishable Key`}
                  />
                </div>
                <div className="col-12">
                  <Input
                    type={`text`}
                    id={`stripeSecretKey`}
                    name={`stripeSecretKey`}
                    label={`Stripe Secret Key`}
                    placeholder={`Stripe Secret Key`}
                    errorMessage={`Enter Stripe Secret Key`}
                  />
                </div>
                <div className="inputData">
                  <div>
                    <label className="my-3">Stripe Pay Active</label>
                  </div>
                  <ToggleSwitch
                    onClick={() => handleSettingSwitch(setting?._id, 2)}
                    value={setting?.isStripePay}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mt-3 ">
              <div className="settingBoxOuter">
                <div className="settingBoxHeader">
                  <h4>Currency Setting</h4>
                </div>

                <div className="col-12">
                  <Input
                    type={`text`}
                    id={`currencyName`}
                    name={`currencyName`}
                    label={`Currency Name`}
                    placeholder={`Currency Name`}
                    errorMessage={`Enter Currency Name`}
                  />
                </div>
                <div className="col-12">
                  <Input
                    type={`text`}
                    id={`currencySymbol`}
                    name={`currencySymbol`}
                    label={`Currency Symbol`}
                    placeholder={`Currency Symbol`}
                    errorMessage={`Enter Currency Symbol`}
                  />
                </div>
                <div className="inputData">
                  <div>
                    <label className="my-3">Cash After Service</label>
                  </div>
                  <ToggleSwitch
                    onClick={() => handleSettingSwitch(setting?._id, 5)}
                    value={setting?.cashAfterService}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mt-3 ">
              <div className="settingBoxOuter">
                <div className="settingBoxHeader">
                  <h4>Flutter Wave Setting</h4>
                </div>

                <div className="col-12">
                  <Input
                    type={`text`}
                    id={`flutterWaveKey`}
                    name={`flutterWaveKey`}
                    label={`FlutterWave Key`}
                    placeholder={`FlutterWave Key`}
                    errorMessage={`Enter FlutterWave Key`}
                  />
                </div>
                <div className="inputData">
                  <div>
                    <label className="my-3">isFlutterWave</label>
                  </div>
                  <ToggleSwitch
                    onClick={() => handleSettingSwitch(setting?._id, 4)}
                    value={setting?.isFlutterWave}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Setting;
