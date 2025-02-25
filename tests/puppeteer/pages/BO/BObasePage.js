require('module-alias/register');
const CommonPage = require('@pages/commonPage');

module.exports = class BOBasePage extends CommonPage {
  constructor(page) {
    super(page);

    // Successful Messages
    this.successfulCreationMessage = 'Successful creation.';
    this.successfulUpdateMessage = 'Successful update.';
    this.successfulDeleteMessage = 'Successful deletion.';
    this.successfulMultiDeleteMessage = 'The selection has been successfully deleted.';

    // top navbar
    this.headerLogoImage = '#header_logo';
    this.userProfileIcon = '#employee_infos';
    this.userProfileLogoutLink = 'a#header_logout';
    this.shopVersionBloc = '#shop_version';
    this.headerShopNameLink = '#header_shopname';

    // left navbar
    // SELL
    this.ordersParentLink = 'li#subtab-AdminParentOrders';
    this.ordersLink = '#subtab-AdminOrders';

    this.productsParentLink = 'li#subtab-AdminCatalog';
    this.productsLink = '#subtab-AdminProducts';

    this.customersParentLink = 'li#subtab-AdminParentCustomer';
    this.customersLink = '#subtab-AdminCustomers';

    // Modules
    this.modulesParentLink = '#subtab-AdminParentModulesSf';
    this.moduleCatalogueLink = '#subtab-AdminParentModulesCatalog';
    this.moduleManagerLink = '#subtab-AdminModulesSf';

    // Shop Parameters
    this.shopParametersParentLink = '#subtab-ShopParameters';
    this.shopParametersGeneralLink = '#subtab-AdminParentPreferences';

    // welcome module
    this.onboardingCloseButton = 'button.onboarding-button-shut-down';
    this.onboardingStopButton = 'a.onboarding-button-stop';

    // Growls
    this.growlMessageBloc = '#growls .growl-message';

    // Alert Text
    this.alertSuccessBloc = 'div.alert.alert-success:not([style=\'display: none;\'])';
    this.alertSuccessBlockParagraph = `${this.alertSuccessBloc} div.alert-text p`;

    // Modal dialog
    this.modalDialog = '#confirmation_modal.show .modal-dialog';
    this.modalDialogYesButton = `${this.modalDialog} button.continue`;
    this.modalDialogNoButton = `${this.modalDialog} button.cancel`;

    // Symfony Toolbar
    this.sfToolbarMainContentDiv = 'div[id*=\'sfToolbarMainContent\']';
    this.sfCloseToolbarLink = 'a[id*=\'sfToolbarHideButton\']';
  }

  /*
  Methods
   */
  /**
   * Open a subMenu if closed and click on a sublink
   * @param parentSelector
   * @param linkSelector
   * @returns {Promise<void>}
   */
  async goToSubMenu(parentSelector, linkSelector) {
    if (await this.elementVisible(linkSelector)) {
      await this.page.click(linkSelector);
    } else {
      // open the block
      await this.page.click(parentSelector);
      await this.page.waitForSelector(`${parentSelector}.open`, {visible: true});
      await this.page.click(linkSelector);
    }
    await this.page.waitForSelector(`${linkSelector}.-active`, {visible: true});
  }

  /**
   * Returns to the dashboard then logout
   * @returns {Promise<void>}
   */
  async logoutBO() {
    await this.page.click(this.headerLogoImage);
    await this.page.waitForSelector(this.userProfileIcon);
    await this.page.click(this.userProfileIcon);
    await this.page.waitForSelector(this.userProfileLogoutLink);
    await this.page.click(this.userProfileLogoutLink);
  }

  /**
   * Close the onboarding modal if exists
   * @returns {Promise<void>}
   */
  async closeOnboardingModal() {
    if (await this.elementVisible(this.onboardingCloseButton, 1000)) {
      await this.page.click(this.onboardingCloseButton);
      await this.page.waitForSelector(this.onboardingStopButton, {visible: true});
      await this.page.click(this.onboardingStopButton);
    }
  }

  /**
   * Click on View My Shop and wait for page to open in a new Tab
   * @return FOPage, page opened
   */
  async viewMyShop() {
    return this.openLinkWithTargetBlank(this.page, this.headerShopNameLink, false);
  }

  /**
   * Set value on tinyMce textareas
   * @param iFrameSelector
   * @param value
   * @return {Promise<void>}
   */
  async setValueOnTinymceInput(iFrameSelector, value) {
    await this.page.click(iFrameSelector, {clickCount: 3});
    await this.page.keyboard.type(value);
  }

  /**
   * Close symfony Toolbar
   * @return {Promise<void>}
   */
  async closeSfToolBar() {
    if (await this.elementVisible(`${this.sfToolbarMainContentDiv}[style='display: block;']`, 1000)) {
      await this.page.click(this.sfCloseToolbarLink);
    }
  }
};
