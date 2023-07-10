import Api from '@/services/Api'
import ApiAdmin from '@/services/ApiAdmin'
import ApiAgency from '@/services/ApiAgency'

export default {
    //2fa admin
    active2fa(obj) {
        return ApiAdmin().post('api/users/active-2fa', obj)
    },

    disable2fa(obj) {
        return ApiAdmin().post('api/users/disable-2fa', obj)
    },

    adminDisable2fa(obj) {
        return ApiAdmin().post('api/users/admin-disable-2fa', obj)
    },

    check2fa(obj) {
        return ApiAdmin().post('api/users/check-2fa', obj)
    },

    checkOn2fa() {
        return ApiAdmin().get('api/users/check-on-2fa')
    },


    //
    //=========== USER
    loginUser(obj) {
        return Api().post('api/users/login', obj)
    },

    getTokenActive(obj) {
        return Api().post('api/users/activeUser', obj)
    },

    registerUser(obj) {
        return Api().post('api/users/createAccount', obj)
    },

    forgotPassUser(obj) {
        return Api().post('api/users/forgot-password', obj)
    },

    resendConfirUser(obj) {
        return Api().post('api/users/resend-confirmation-email', obj)
    },

    changePassword(obj) {
        return Api().patch('api/users/change-password', obj)
    },

    changePassword2(obj) {
        return Api().patch('api/users/change-password-is', obj)
    },

    getInfoUser() {
        return Api().get('api/users/info')
    },

    updateXacMinhTK(obj) {
        return Api().post('api/users/update-info', obj)
    },

    activeGG2FA(obj) {
        return Api().post('api/users/update-gg2fa', obj)
    },

    unActiveGG2FA(obj) {
        return Api().post('api/users/disable-gg2fa', obj)
    },

    sendGG2FA() {
        return Api().get('api/users/code-2fa')
    },

    createGG2FA(role) {
        if (void 0 !== role) {
            return ApiAdmin().get('api/users/create-gg2fa')
        }
        return Api().get('api/users/create-gg2fa')
    },

    loginGG2FA(obj) {
        return Api().post('api/users/login-2fa', obj)
    },

    reloadMoneyDemo() {
        return Api().put('api/users/demo')
    },

    getListHitoryOrder() {
        return Api().get('api/users/listbo')
    },

    sendMoneyLiveToUsdt(obj) {
        return Api().post('api/users/live-to-usdt', obj)
    },

    sendMoneyUsdtToLive(obj) {
        return Api().post('api/users/usdt-to-live', obj)
    },

    withdrawalUserNoiBo(obj) {
        return Api().post('api/users/withdrawal', obj)
    },

    withdrawalUsdtERC(obj) {
        return Api().post('api/users/withdrawal-erc', obj)
    },

    withdrawalUsdtBSC(obj) {
        return Api().post('api/users/withdrawal-bsc', obj)
    },

    withdrawalUsdtVND(obj) {
        return Api().post('api/users/withdrawal-vnd', obj)
    },

    withdrawalPaypalNoiBo(obj) {
        return Api().post('api/users/paypal/withdrawal', obj)
    },

    withdrawalPaypalAccount(obj) {
        return Api().post('api/users/paypal/withdrawal-acc', obj)
    },

    getBalanceWallet() {
        return Api().get('api/users/balance-wallet')
    },

    scanWallet(email) {
        return Api().get(`api/users/scan-wallet?e=${email}`)
    },

    getBankInfo() {
        return Api().get('api/users/bank-info')
    },

    depositWallet(obj) {
        return Api().post('api/users/usdt-wallet', obj)
    },

    UserBuyVip() {
        return Api().post('api/users/buy-vip')
    },

    getNguoiGioiThieu() {
        return Api().get('api/users/presenter')
    },

    getThongTinLoiNhuan() {
        return Api().get('api/users/bo-statistics')
    },

    getListHisOrder() {
        return Api().get('api/users/history-order')
    },

    getSeachListOrder(obj) {
        return Api().post('api/users/history-order-date', obj)
    },

    getListHisTradeWallet() {
        return Api().get('api/users/history-wallet')
    },

    getListHisTradeWalletNumber(num) {
        return Api().get('api/users/history-wallet/' + num)
    },

    getListHisTradeWalletHH() {
        return Api().get('api/users/history-wallet-co')
    },

    getListHisTradeWalletHHNumber(num) {
        return Api().get('api/users/history-wallet-co/' + num)
    },

    getListHisTradeWalletWGD() {
        return Api().get('api/users/history-wallet-trade')
    },

    getListHisTradeWalletWGDNumber(num) {
        return Api().get('api/users/history-wallet-trade/' + num)
    },

    chiTietLoiNhuanHoaHong() {
        return Api().get('api/users/commission-details')
    },

    chiTietLoiNhuanHoaHongPage(num) {
        return Api().get('api/users/commission-details/' + num)
    },

    getSeachListChiTietHH(obj) {
        return Api().post('api/users/commission-details-date', obj)
    },

    getSeachListLvAgency(obj) {
        return Api().post('api/users/agency-search-lv', obj)
    },

    getSeachListNameAgency(obj) {
        return Api().post('api/users/agency-search-name', obj)
    },

    depositPaypal(obj) {
        return Api().get('api/paypal/pay?a=' + obj.a + '&n=' + obj.n)
    },

    depositVND(obj) {
        return Api().get('api/pay/vnd?a=' + obj.a + '&n=' + obj.n + '&al=' + obj.al + '&b=' + obj.b)
    },

    getAddressCoin(coin) {
        return Api().get('api/wallet/' + coin + '/address')
    },

    transWallet(obj) {
        return Api().post('api/exs/trans', obj)
    },

    getSetupWallet() {
        return Api().get('api/setup/wallet')
    },

    getSupport() {
        return Api().get('api/setup/supports')
    },


    getExChangeUser() {
        return Api().get('api/exs/hisUser')
    },

    getStatusServer() {
        return Api().get('status')
    },

    checkGiaoDich(obj) {
        return Api().post('api/user/balance/trans/check', obj)
    },

    getListNotifi(obj) {
        return Api().post('api/users/getListNotifi', obj)
    },

    updateListNotifi(obj) {
        return Api().post('api/users/updateListNotifi', obj)
    },


    //=========== END USER


    //========== MEMBER

    activeUser(obj) {
        return ApiAdmin().post('api/users/admin-active-user', obj)
    },

    getRevenueNap() {
        return ApiAdmin().get('api/trades/getRevenueNap')
    },

    getRevenueRut() {
        return ApiAdmin().get('api/trades/getRevenueRut')
    },

    getRevenueTrans() {
        return ApiAdmin().get('api/trades/getRevenueTrans')
    },

    getShowDT(obj) {
        return ApiAdmin().post('api/trades/getShowDT', obj)
    },

    changeAccMarketing(obj) {
        return ApiAdmin().post('api/users/changeAcc', obj)
    },

    changePassAdmin(obj) {
        return ApiAdmin().post('api/users/changPassAd', obj)
    },

    createUser(obj) {
        return ApiAdmin().post('api/users/create', obj)
    },

    register(obj) {
        return ApiAdmin().post('api/users/register', obj)
    },

    loginAdmin(obj) {
        return ApiAdmin().post('api/users/AdminSingIn', obj)
    },

    checkEmail(email) {
        return ApiAdmin().get('api/users/checkEmail/' + email)
    },

    getAllMember() {
        return ApiAdmin().get('api/users/getAllUser')
    },

    updateMember(obj) {
        return ApiAdmin().patch('api/users/updateUser', obj)
    },

    updatePriceMember(obj) {
        return ApiAdmin().patch('api/users/updateMoney', obj)
    },

    handleMoney(obj) {
        return ApiAdmin().post('api/pay/approval', obj);
    },

    handleMoneyRut(obj) {
        return ApiAdmin().post('api/pay/approval-rut', obj);
    },

    deleteMember(id) {
        return ApiAdmin().delete('api/users/deleteUserById/' + id)
    },

    verifiedUser(obj) {
        return ApiAdmin().post('api/users/verifiedUser', obj)
    },

    getListAgency() {
        return ApiAdmin().get('api/users/getAgency')
    },

    viewMemberAgency(id) {
        return ApiAdmin().get('api/users/viewTotalMAgency/' + id)
    },

    addMoneyMember(obj) {
        return ApiAdmin().post('api/users/addMoneyMember', obj)
    },

    getRateCommission() {
        return ApiAdmin().get('api/setup/getRateCommission')
    },

    saveRateCommission(obj) {
        return ApiAdmin().post('api/setup/saveRateCommission', obj)
    },

    getStakingRate() {
        return ApiAdmin().get('api/staking/set-rate')
    },

    setStakingRate(data) {
        return ApiAdmin().post('api/staking/set-rate', data)
    },


    //==========

    //================
    //================
    //================
    //========== TRADE
    //================
    //================
    //================

    getAddMoneyListHistory() {
        return ApiAdmin().get('api/trades/historyAllAddMoney');
    },

    getTotalAddMoney() {
        return ApiAdmin().get('api/trades/totalAddMoney');
    },


    getTradeListHistory() {
        return ApiAdmin().get('api/trades/historyAll');
    },


    gethistoryAllTrash() {
        return ApiAdmin().get('api/trades/historyAllTrash');
    },


    deleteTrashByID(obj) {
        return ApiAdmin().patch('api/trades/deleteTradeHisById', obj);
    },

    getDepositListHistory() {
        return ApiAdmin().get('api/trades/hisDepositAll');
    },

    // Đại lý
    getDepositListHistoryAgency(email, f) {
        return Api().get(`api/trades/hisDepositAll?email=${email}&${f}`);
    },
    //


    getDepositAllTrash() {
        return ApiAdmin().get('api/trades/hisDepositAllTrash');
    },

    getWithdrawalListHistory() {
        return ApiAdmin().get('api/trades/hisWithDrawalAll');
    },

    // Dai ly
    getWithdrawalListHistoryAgency(email, f) {
        return Api().get(`api/trades/hisWithDrawalAll?email=${email}${f}`);
    },
    //

    doneWithDrawalByID(obj) {
        return ApiAdmin().post('api/trades/doneWithdrawal', obj)
    },

    doneRefuseWithDrawalByID(obj) {
        return ApiAdmin().post('api/trades/doneRefuseWithdrawal', obj)
    },

    getListF1F7(obj) {
        return ApiAdmin().post('api/users/getListF1F7', obj)
    },
    //Dai lý

    getStatisticsListF1F7(email, f) {
        return ApiAgency().get(`api/users/thong-ke-getListF1F7?email=${email}${f}`);
    },
    //
    getSuperior(uplineID) {
        return ApiAdmin().get(`api/users/getSuperior/${uplineID}`)
    },

    getLiveAccount(ref) {
        return ApiAdmin().get(`api/users/get-live-account/${ref}`)
    },

    getLisCommissionSearch(obj) {
        return ApiAdmin().post('api/users/getListCmsHis', obj)
    },


    //================
    //================
    //================
    //================
    //================

    //================
    //================
    //================
    //========== Analytics
    //================
    //================
    //================


    getAnalytics() {
        return ApiAdmin().get('api/users/analytics')
    },


    //================
    //================
    //================
    //========== Analytics
    //================
    //================
    //================


    //================
    //================
    //================
    //========== BET
    //================
    //================
    //================

    getBetsListHistory() {
        return ApiAdmin().get('api/bets/historyBet')
    },

    //Đại lý
    getBetsListHistoryAgency(email, f) {
        return Api().get(`api/bets/historyBet?email=${email}&${f}`);
    },
    //

    getBetsListHisTrash() {
        return ApiAdmin().get('api/bets/hisBetTrash')
    },

    deleteBetsTrash(obj) {
        return ApiAdmin().patch('api/bets/deleteBet', obj)
    },

    //================
    //================
    //================
    //================
    //================


    //================
    //================
    //================
    //========== EXCHANGE
    //================
    //================
    //================

    getExListHistory() {
        return ApiAdmin().get('api/exs/historyEx')
    },

    getExListHisTrash() {
        return ApiAdmin().get('api/exs/historyExTrash')
    },

    deleteExTrash(obj) {
        return ApiAdmin().patch('api/exs/deleteEx', obj)
    },

    //================
    //================
    //================
    //================
    //================

    uploadAvatar(obj) {
        return Api().post('api/auth/avatar', obj)
    },

    uploadPassportFront(obj) {
        return Api().post('api/auth/passport/front', obj)
    },

    uploadPassportBack(obj) {
        return Api().post('api/auth/passport/back', obj)
    },

    //================
    //================
    //================
    //========== GAME
    //================
    //================
    //================
    // Giải đấu
    createChampion(obj) {
        return ApiAdmin().post('api/game/champion', obj)
    },
    getChampions() {
        return ApiAdmin().get('api/game/champions')
    },
    getChampionsClient() {
        return Api().get('api/game/champions')
    },
    deleteChampion(id) {
        return ApiAdmin().delete(`api/game/champion/${id}`)
    },
    updateChampion(id, obj) {
        return ApiAdmin().put(`api/game/champion/${id}`, obj)
    },
    uploadBackgroundImage(obj) {
        return Api().post('api/auth/champion', obj)
    },

    getActiveGames() {
        return Api().get('api/game/active-games')
    },

    // Rút thăm may mắn
    createLuckyDrawAdmin(obj, type) {
        return ApiAdmin().put(`api/game1/lucky-draws/${type}`, obj)
    },
    getLuckyDrawAdmin() {
        return ApiAdmin().get('api/game1/lucky-draws-admin')
    },
    getLuckyDraw() {
        return Api().get('api/game1/lucky-draws')
    },
    getThongTinLoiNhuanHangNgay() {
        return Api().get('api/users/bo-statistics-current-day')
    },

    createStreakChallenge(config) {
        return ApiAdmin().post('/api/game2/streak-challenge', config);
    },

    getStreakChallenge() {
        return ApiAdmin().get('/api/game2/streak-challenge');
    },

    getStreakClientChallenge() {
        return Api().get('/api/game2/streak-challenge');
    },

    getUserStreakChallenge() {
        return ApiAdmin().get('/api/game2/streak-challenge-user');
    },

    getUserClientStreakChallenge() {
        return Api().get('/api/game2/streak-challenge-user');
    },

    addUserStreakChallenge(dataAddUser) {
        return ApiAdmin().post('/api/game2/streak-challenge-user', dataAddUser);
    },

    getPrizeUser() {
        return Api().get('/api/game2/prize');
    },

    //Agency
    getInfoAgency() {
        return ApiAgency().get('api/users/info')
    },

}
