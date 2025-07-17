+16-0
import React from "react";
import { Button } from "antd";

interface UpdateAllButtonProps {
  onClick: () => void;
}

export const UpdateAllButton: React.FC<UpdateAllButtonProps> = ({ onClick }) => (
  <Button
    type="primary"
    onClick={onClick}
    style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}
  >
    ενημέρωση όλων
  </Button>
);