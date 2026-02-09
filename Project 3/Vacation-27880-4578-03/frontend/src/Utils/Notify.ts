class Notify {
    public success(message: string): void {
        alert(message);
    }

    public error(err: unknown): void {
        const message = this.extractErrorMessage(err);
        alert(message);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private extractErrorMessage(err: any): string {
        if (typeof err === "string") return err;
        if (err?.response?.data && typeof err.response.data === "string") return err.response.data;
        if (err?.message) return err.message;
        return "Some error occurred, please try again.";
    }
}

const notify = new Notify();
export default notify;
