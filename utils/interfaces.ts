export type IPrompt = {
  prompt: string;
  tag: string;
};

export interface IUserPrompt {
  _id: string;
  creator: IPromptCreator;
  prompt: string;
  tag: string;
}

export interface IUserProfile {
  _id: string;
  email: string;
  username: string;
  image: string;
}

export interface IPromptCreator extends IUserProfile {}
