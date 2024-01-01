import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unclaimProfile } from "../../../apis/apis";
import { PrimaryButton } from "../../../components/Buttons/PrimaryButton";
import { SecondaryButton } from "../../../components/Buttons/SecondaryButton";
import Modal from "../../../components/Modals/Modal";
import usePlayername from "../../../hooks/usePlayername";

export default function UnclaimProfileModal({ isOpen, onClose, setWarning }) {
  const { isAuthenticated, user } = useAuth0();
  const { playername } = usePlayername();
  const queryClient = useQueryClient();
  const disconnectMutation = useMutation({
    mutationFn: async (userId) => {
      console.log(userId);
      const result = await unclaimProfile(userId);
      if (result == null) {
        throw new Error("Unsuccessful profile disconnection");
      }
    },
  });

  const handleDisconnect = async () => {
    if (!isAuthenticated || !user) {
      return;
    }

    const userId = user.sub;

    try {
      // @ts-ignore
      const result = await disconnectMutation.mutateAsync(userId);

      queryClient.invalidateQueries({ queryKey: ["userData"] });
      onClose();
    } catch (err) {
      setWarning(
        `Failed to disconnect account from ${playername}'s profile. Please try again`
      );
      console.log(err);
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="claim-profile-popup">
        <h2 className="claim-profile-popup__title">Disconnect profile?</h2>
        <span className="claim-profile-popup__description">
          Are you sure you want to disconnect your account from{" "}
          <b> {playername}</b>?
        </span>
        <div className="claim-profile-popup__button-section">
          <PrimaryButton onClick={() => onClose()}>Cancel</PrimaryButton>
          <SecondaryButton onClick={handleDisconnect}>
            Disconnect
          </SecondaryButton>
        </div>
      </section>
    </Modal>
  );
}
