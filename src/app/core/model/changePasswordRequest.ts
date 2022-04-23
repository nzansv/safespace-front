export class ChangePasswordRequest {
    userId: number;
    currentPassword: string;
    newPassword: string;
    confirmationPassword: string;

    // constructor(userId: number, currentPassword: string, newPassword: string, confirmationPassword: string) {
    //     this.userId = userId;
    //     this.currentPassword = currentPassword;
    //     this.newPassword = newPassword;
    //     this.confirmationPassword = confirmationPassword;
    // }
}
