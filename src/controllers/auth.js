import { registerUser, loginUser } from '../services/auth.js';

export const registerUserController = async (req, resp) => {
  const user = await registerUser(req.body);

  resp.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export async function loginController(req, res) {
  const session = await loginUser(req.body.email, req.body.password);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntill,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntill,
  });

  res.status(200).json({
    status: 200,
    message: 'Login successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
}
