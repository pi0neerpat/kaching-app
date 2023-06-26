import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useFormContext } from "context/FormContext";
import Icon from "./Icon";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import SocialButton from "./SocialButton";
import RoundedButton from "./RoundedButton";

interface RecipientProps {
  previousStep: () => void;
}

type Platform = "google" | "discord" | "twitter" | "twitch";

const Recipient: React.FC<RecipientProps> = ({ previousStep }) => {
  const { setPlatform, platform, type, setUsername, username } =
    useFormContext();
  const localForm = useForm<FieldValues>();
  const {
    getValues,
    register,
    watch,
    trigger,
    formState: { errors, isValid },
  } = localForm;

  const values = getValues();
  watch();

  const handleActiveIcons = (platform: Platform): void => {
    setPlatform(platform);
  };

  const handleRecipient = async (): Promise<void> => {
    const valid = await trigger();
    if (valid) {
      const stateUpdates = () => {
        setUsername(values.username);
      };
      stateUpdates();
      previousStep();
    }

    return;
  };

  const emailValidation = (val: string) => {
    if (platform === "google") {
      return val.includes("@") || "Oops. Thats not a Gmail address.";
    }
  };

  const getPlatformPlaceholder = () => {
    if (platform === "google") {
      return "Recipient Email";
    } else if (platform === "discord") {
      return "Discord Username";
    } else if (platform === "twitter") {
      return "Twitter Username";
    } else if (platform === "twitch") {
      return "Twitch Username";
    }
  };

  return (
    <Flex flexDirection="column">
      <Heading
        as="h2"
        fontWeight="700"
        fontSize="40px"
        color="#33912E"
        textTransform="capitalize"
        mb="40px"
      >
        Send to
      </Heading>
      <Flex justifyContent="flex-end">
        <ErrorMessage
          errors={errors}
          name="username"
          render={({ message }) => {
            return (
              <Box
                display={message ? "block" : "none"}
                mt={message ? "-1rem" : "0"}
                position="relative"
                zIndex={1}
                color="#E45200"
              >
                {message}
              </Box>
            );
          }}
        />
      </Flex>
      <Input
        {...register("username", {
          value: username,
          required: "Cannot be blank",
          minLength: {
            value: 1,
            message: "Cannot be blank",
          },
          validate: emailValidation,
        })}
        type={platform === "google" ? "email" : "text"}
        placeholder={getPlatformPlaceholder()}
        mb="24px"
        height="64px"
        bg="rgba(255, 255, 255, 0.8)"
        fontSize="24px"
        fontWeight="400"
        _placeholder={{ color: "#155A11", opacity: 1 }}
      />
      <Flex mb="107px" justifyContent="space-between">
        <SocialButton
          name="google"
          platform={platform}
          handleActiveIcons={handleActiveIcons}
        />
        <SocialButton
          name="discord"
          platform={platform}
          handleActiveIcons={handleActiveIcons}
        />
        <SocialButton
          name="twitter"
          platform={platform}
          handleActiveIcons={handleActiveIcons}
        />
        <SocialButton
          name="twitch"
          platform={platform}
          handleActiveIcons={handleActiveIcons}
        />
      </Flex>
      <Flex>
        <Box mr="8px">
          <RoundedButton text="Cancel" arrow={false} onClick={previousStep} />
        </Box>
        <RoundedButton
          isValid={isValid}
          type="submit"
          onClick={handleRecipient}
          text="Confirm"
        />
      </Flex>
    </Flex>
  );
};

export default Recipient;
